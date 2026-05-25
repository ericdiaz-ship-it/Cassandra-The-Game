const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent?key=AIzaSyCnFd_LSp1CIFlTAejAh3dxikBtjQIJyy8';
const payload = {
  systemInstruction: {
    parts: [{ text: "You are a helpful assistant." }]
  },
  contents: [
    { role: 'user', parts: [{ text: "Hello" }] }
  ],
  generationConfig: {
    temperature: 0.82,
    maxOutputTokens: 180,
    topP: 0.95
  }
};

fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
