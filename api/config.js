// Load configuration from environment variables (Vercel) or .env file

const getConfig = () => {
  return {
    GEMINI_KEY: process.env.GEMINI_KEY || '',
    GEMINI_MODEL: process.env.GEMINI_MODEL || 'gemma-4-31b-it',
    SUPABASE_URL: process.env.SUPABASE_URL || '',
    SUPABASE_KEY: process.env.SUPABASE_KEY || '',
    NODE_ENV: process.env.NODE_ENV || 'production',
    DEBUG: process.env.DEBUG === 'true'
  };
};

module.exports = { getConfig };
