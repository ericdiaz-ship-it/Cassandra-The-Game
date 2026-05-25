// CASSANDRA Project - Configuration Loader (Client-side)
// Las claves de API se manejan en el servidor (api/chat.js)
// El cliente solo necesita saber la ruta del endpoint

const CONFIG = {
  // Gemini settings — la llamada pasa por /api/chat (serverless function)
  GEMINI_KEY: '',
  GEMINI_MODEL: 'gemma-4-31b-it',
  GEMINI_URL: '/api/chat',

  // Supabase settings
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY',

  // Client-only settings
  NODE_ENV: window.location.hostname === 'localhost' ? 'development' : 'production',
  DEBUG: window.location.hostname === 'localhost'
};

// Expose to global scope for use in other scripts
window.CONFIG = CONFIG;
