const supabase = require('../supabaseClient.js');

const User = {
  async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async create(userData) {
    const { data, error } = await supabase.from('users').insert(userData);
    if (error) throw error;
    return data;
  },

  async updatePassword(email, password_hash) {
    const { data, error } = await supabase
      .from('users')
      .update({ password_hash })
      .eq('email', email);

    if (error) throw error;
    return data;
  }
};

module.exports = User;
