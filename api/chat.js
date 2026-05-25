module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const GEMINI_KEY = process.env.GEMINI_KEY;
  if (!GEMINI_KEY) {
    return res.status(500).json({ error: 'GEMINI_KEY is not configured in the environment' });
  }

  const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent?key=' + GEMINI_KEY;

  try {
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error('Error proxying to Gemini:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
