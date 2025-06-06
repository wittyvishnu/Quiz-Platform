const supabase = require('../supabaseClient');
const { v4: uuidv4 } = require('uuid');

const submitResponse = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: 'Request body is required' });
  }

  const { quiz_id, name, answers } = req.body;

  if (!quiz_id || !answers || !Array.isArray(answers) || answers.length === 0) {
    return res.status(400).json({ error: 'Quiz ID and non-empty answers array are required' });
  }

  const generatedUuid = uuidv4();
  const responseName = name && name.trim() ? `${name.trim()}:${generatedUuid}` : generatedUuid;

  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id')
      .eq('id', quiz_id)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    for (const response of answers) {
      const { question_id, answer, text_answer } = response;

      if (!question_id) {
        return res.status(400).json({ error: 'Question ID is required for each answer' });
      }

      const { data: question, error: questionError } = await supabase
        .from('questions')
        .select('type, correct_answer')
        .eq('id', question_id)
        .eq('quiz_id', quiz_id)
        .single();

      if (questionError || !question) {
        return res.status(400).json({ error: `Invalid question ID: ${question_id}` });
      }

      let optionId = null;
      if (question.type === 'single-choice') {
        if (!answer || text_answer) {
          return res.status(400).json({ error: `Single-choice question ${question_id} requires an answer (option_id) and no text_answer` });
        }
        const { data: option, error: optionError } = await supabase
          .from('question_options')
          .select('id')
          .eq('id', answer)
          .eq('question_id', question_id)
          .single();

        if (optionError || !option) {
          return res.status(400).json({ error: `Invalid option ID: ${answer}` });
        }
        optionId = option.id;
      } else if (question.type === 'short-text') {
        if (answer || !text_answer || !text_answer.trim()) {
          return res.status(400).json({ error: `Short-text question ${question_id} requires a non-empty text_answer and no answer` });
        }
      }

      const { error: insertError } = await supabase
        .from('responses')
        .insert({
          id: uuidv4(),
          name: responseName,
          quiz_id,
          question_id,
          answer: question.type === 'single-choice' ? optionId : null,
          text_answer: question.type === 'short-text' ? text_answer : null,
          submitted_at: new Date().toISOString()
        });

      if (insertError) throw insertError;
    }

    return res.status(200).json({ 
      userid:responseName,
      message: 'Quiz response submitted successfully' });
  } catch (error) {
    console.error('Submit response error:', error);
    return res.status(500).json({ error: 'Failed to submit response' });
  }
};

const viewResponses = async (req, res) => {
  const { quiz_id } = req.params;
  const user = req.user;

  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id, user_id')
      .eq('id', quiz_id)
      .eq('user_id', user.id)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({ error: 'Quiz not found or you are not the creator' });
    }

    const { data: responses, error: responseError } = await supabase
      .from('responses')
      .select(`
        id,
        name,
        question_id,
        answer,
        text_answer,
        submitted_at,
        questions (
          type,
          question_text,
          correct_answer
        )
      `)
      .eq('quiz_id', quiz_id)
      .order('submitted_at', { ascending: false });

    if (responseError) throw responseError;

    // Group responses by name
    const responseGroups = responses.reduce((acc, response) => {
      if (!acc[response.name]) {
        acc[response.name] = {
          name: response.name,
          latest_submitted_at: response.submitted_at,
          answers: []
        };
      }
      // Update latest submitted_at if current is more recent
      if (new Date(response.submitted_at) > new Date(acc[response.name].latest_submitted_at)) {
        acc[response.name].latest_submitted_at = response.submitted_at;
      }
      acc[response.name].answers.push(response);
      return acc;
    }, {});

    const summary = await Promise.all(
      Object.values(responseGroups).map(async group => {
        let totalCorrect = 0;

        for (const response of group.answers) {
          let isCorrect;
          if (response.questions.type === 'single-choice') {
            const { data: option } = await supabase
              .from('question_options')
              .select('is_correct')
              .eq('id', response.answer)
              .single();
            isCorrect = option?.is_correct || false;
          } else {
            if (response.questions.correct_answer) {
              const keywords = response.questions.correct_answer
                .split(',')
                .map(k => k.trim().toLowerCase());
              const textAnswer = response.text_answer?.toLowerCase().trim() || '';
              isCorrect = keywords.some(keyword => textAnswer.includes(keyword));
            } else {
              isCorrect = null;
            }
          }
          if (isCorrect) totalCorrect++;
        }

        return {
          name: group.name,
          submitted_at: group.latest_submitted_at,
          total_correct_answers: totalCorrect
        };
      })
    );

    return res.status(200).json(summary);
  } catch (error) {
    console.error('Fetch responses error:', error);
    return res.status(500).json({ error: 'Failed to fetch responses' });
  }
};

const getPublicResponsesByName = async (req, res) => {
  let { quiz_id, name } = req.params;
  name = decodeURIComponent(name);

  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select(`
        id,
        title,
        questions (
          id,
          type,
          question_text,
          correct_answer,
          question_options (
            id,
            option_text,
            is_correct
          )
        )
      `)
      .eq('id', quiz_id)
      .single();

    if (quizError || !quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const { data: responses, error: responseError } = await supabase
      .from('responses')
      .select(`
        id,
        name,
        question_id,
        answer,
        text_answer,
        submitted_at
      `)
      .eq('quiz_id', quiz_id)
      .eq('name', name);

    if (responseError) throw responseError;

    const responseMap = responses.reduce((acc, response) => {
      acc[response.question_id] = {
        response_id: response.id,
        answer: response.answer,
        text_answer: response.text_answer,
        submitted_at: response.submitted_at,
        is_correct: null
      };
      return acc;
    }, {});

    for (const question of quiz.questions) {
      const response = responseMap[question.id];
      if (response) {
        if (question.type === 'single-choice' && response.answer) {
          const option = question.question_options.find(opt => opt.id === response.answer);
          response.is_correct = option?.is_correct || false;
        } else if (question.type === 'short-text' && response.text_answer) {
          if (question.correct_answer) {
            const keywords = question.correct_answer.split(',').map(k => k.trim().toLowerCase());
            const textAnswer = response.text_answer.toLowerCase().trim();
            response.is_correct = keywords.some(keyword => textAnswer.includes(keyword));
          } else {
            response.is_correct = null;
          }
        }
      }
    }

    const formattedQuestions = quiz.questions.map(question => {
      const response = responseMap[question.id];
      return {
        question_id: question.id,
        type: question.type,
        question_text: question.question_text,
        options: question.question_options.map(opt => ({
          id: opt.id,
          text: opt.option_text,
          is_correct: opt.is_correct
        })),
        correct_answer: question.correct_answer,
        user_response: response ? {
          response_id: response.response_id,
          answer: response.answer,
          text_answer: response.text_answer,
          submitted_at: response.submitted_at,
          is_correct: response.is_correct
        } : null
      };
    });

    return res.status(200).json({
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      questions: formattedQuestions
    });
  } catch (error) {
    console.error('Fetch public responses error:', error);
    return res.status(500).json({ error: 'Failed to fetch public responses' });
  }
};

module.exports = { submitResponse, viewResponses, getPublicResponsesByName };