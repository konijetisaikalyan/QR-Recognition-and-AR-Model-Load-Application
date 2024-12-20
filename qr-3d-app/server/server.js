const express = require('express');
const app = express();
const port = 5000;

// Dummy function to simulate model URL retrieval based on the QR code
const getModelUrlByCode = (code) => {
  const modelUrls = {
    '123': 'http://example.com/model1.glb',
    '456': 'http://example.com/model2.glb',
  };

  return modelUrls[code];
};

// API endpoint to handle QR code requests
app.get('/api/model/:code', (req, res) => {
  const code = req.params.code;
  console.log(Looking up model for code: ${code});

  const modelUrl = getModelUrlByCode(code);

  if (modelUrl) {
    res.json({ modelUrl });
  } else {
    res.status(404).json({ error: 'Model not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(Backend is running on http://localhost:${port});
});