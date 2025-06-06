const supabase = require('../supabaseClient');
const { v4: uuidv4 } = require('uuid');

const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  const user = req.user;

  if (!title || !questions || !Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: 'Title and non-empty questions array are required' });
  }

  try {
    const quizId = uuidv4();
    const appUrl = process.env.APP_URL || 'http://localhost:5000'; // Default fallback
    if (!appUrl) {
      throw new Error('APP_URL environment variable is not set');
    }
    const publicUrl = `${appUrl}/quiz/${quizId}`;

    const { error: quizError } = await supabase
      .from('quizzes')
      .insert({
        id: quizId,
        title,
        user_id: user.id,
        public_url: publicUrl,
        created_at: new Date().toISOString()
      });

    if (quizError) throw quizError;

    for (const question of questions) {
      const { type, question_text, options, correct_answer } = question;

      if (!type || !question_text || !['single-choice', 'short-text'].includes(type)) {
        return res.status(400).json({ error: 'Invalid question type or missing question text' });
      }

      if (type === 'single-choice' && (!options || !Array.isArray(options) || options.length === 0)) {
        return res.status(400).json({ error: 'Single-choice questions require options' });
      }

      if (type === 'short-text' && options) {
        return res.status(400).json({ error: 'Short-text questions should not have options' });
      }

      const questionId = uuidv4();
      const { error: questionError } = await supabase
        .from('questions')
        .insert({
          id: questionId,
          quiz_id: quizId,
          type,
          question_text,
          correct_answer: type === 'short-text' ? correct_answer : null
        });

      if (questionError) throw questionError;

      if (type === 'single-choice') {
        for (const option of options) {
          const { text, is_correct } = option;
          if (!text || typeof is_correct !== 'boolean') {
            return res.status(400).json({ error: 'Invalid option format' });
          }

          const optionId = uuidv4();
          const { error: optionError } = await supabase
            .from('question_options')
            .insert({
              id: optionId,
              question_id: questionId,
              option_text: text,
              is_correct
            });

          if (optionError) throw optionError;
        }
      }
    }

    return res.status(200).json({
      id: quizId,
      quizId,
      publicUrl
    });
  } catch (error) {
    console.error('Create quiz error:', error);
    return res.status(500).json({ error: 'Failed to create quiz' });
  }
};

const getAllQuizzes = async (req, res) => {
  const user = req.user;

  try {
    console.log(`Fetching quizzes for user_id: ${user.id}`);
    const { data: quizzes, error } = await supabase
      .from('quizzes')
      .select('id, title, public_url, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    if (!quizzes || quizzes.length === 0) {
      console.log(`No quizzes found for user_id: ${user.id}`);
      const { data: allQuizzes } = await supabase
        .from('quizzes')
        .select('id, title, user_id');
      console.log('All quizzes in database:', allQuizzes);
      return res.status(200).json([]);
    }

    return res.status(200).json(quizzes);
  } catch (error) {
    console.error('Fetch quizzes error:', error);
    return res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
};

const getQuizById = async (req, res) => {
  const { quiz_id } = req.params;

  try {
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select(`
        id,
        title,
        public_url,
        created_at,
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

    const formattedQuiz = {
      id: quiz.id,
      title: quiz.title,
      public_url: quiz.public_url,
      created_at: quiz.created_at,
      questions: quiz.questions.map(question => ({
        id: question.id,
        type: question.type,
        question_text: question.question_text,
        correct_answer: question.correct_answer,
        question_options: question.question_options.map(option => ({
          id: option.id,
          option_text: option.option_text,
          is_correct: option.is_correct
        }))
      }))
    };

    return res.status(200).json(formattedQuiz);
  } catch (error) {
    console.error('Fetch quiz error:', error);
    return res.status(500).json({ error: 'Failed to fetch quiz' });
  }
};

module.exports = { createQuiz, getAllQuizzes, getQuizById };