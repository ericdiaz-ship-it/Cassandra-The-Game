// CASSANDRA Project - Configuration Loader (Client-side)

const CONFIG = {
  // API Endpoints
  API_BASE: '/api',
  CHAT_API: '/api/chat',
  DOCS_API: '/api/documents',

  // Gemini settings — llamada directa desde el navegador
  GEMINI_KEY: 'AIzaSyCnFd_LSp1CIFlTAejAh3dxikBtjQIJyy8',
  GEMINI_MODEL: 'gemma-4-31b-it',
  GEMINI_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent',

  // Supabase settings
  SUPABASE_URL: 'YOUR_SUPABASE_URL',
  SUPABASE_KEY: 'YOUR_SUPABASE_ANON_KEY',

  // Client-only settings
  NODE_ENV: window.location.hostname === 'localhost' ? 'development' : 'production',
  DEBUG: window.location.hostname === 'localhost'
};

// Expose to global scope for use in other scripts
window.CONFIG = CONFIG;

// Helper function to call chat API
window.callChatAPI = async (messages) => {
  try {
    const response = await fetch(CONFIG.CHAT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ messages })
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Chat API error:', error);
    throw error;
  }
};

// Helper function to get documents list
window.getDocumentsList = async () => {
  try {
    const response = await fetch(`${CONFIG.DOCS_API}?action=list`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Documents API error:', error);
    throw error;
  }
};
