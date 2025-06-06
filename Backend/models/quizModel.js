const { v4: uuidv4 } = require('uuid');
const supabase = require('../supabaseClient');

const Quiz = {
  async createQuiz({ title, user_id, public_url }) {
    const { data, error } = await supabase
      .from('quizzes')
      .insert({ id: uuidv4(), title, user_id, public_url })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createQuestion({ quiz_id, type, question_text, correct_answer }) {
    const { data, error } = await supabase
      .from('questions')
      .insert({ id: uuidv4(), quiz_id, type, question_text, correct_answer })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createOptions(options) {
    const { error } = await supabase
      .from('question_options')
      .insert(options.map(option => ({
        id: uuidv4(),
        question_id: option.question_id,
        option_text: option.option_text,
        is_correct: option.is_correct
      })));

    if (error) throw error;
  },

  async getQuizzesByUser(user_id) {
    console.log('Querying quizzes for user_id:', user_id);
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title, public_url, created_at')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getAllQuizzes() {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title, user_id, public_url, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getQuizById(quiz_id) {
    const { data: quiz, error } = await supabase
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

    if (error || !quiz) return null;
    return quiz;
  }
};

module.exports = Quiz;