// API endpoint for CASSANDRA chat
// Proxies requests to Google Gemini API securely from the server

const { getConfig } = require('./config');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const config = getConfig();

    if (!config.GEMINI_KEY) {
      res.status(500).json({ error: 'Gemini API key not configured' });
      return;
    }

    const { contents, generationConfig, system_instruction } = req.body;

    if (!contents) {
      res.status(400).json({ error: 'Contents are required' });
      return;
    }

    // Build the payload for Gemini API
    const payload = {
      contents,
      generationConfig: generationConfig || {
        temperature: 0.82,
        maxOutputTokens: 180,
        topP: 0.95
      }
    };

    if (system_instruction) {
      payload.system_instruction = system_instruction;
    }

    // Call Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${config.GEMINI_MODEL}:generateContent?key=${config.GEMINI_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      res.status(response.status).json({ error: errorData });
      return;
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ error: error.message });
  }
};
