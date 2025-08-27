const express = require('express');
const cors = require('cors');
const { readSheet, appendRow } = require('./googleSheets');

const app = express();
app.use(cors());
app.use(express.json());

// Read data
app.get('/api/read', async (req, res) => {
  try {
    const data = await readSheet('Sheet1!A1:C100'); // Adjust range
    res.json({ data });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Write data
app.post('/api/write', async (req, res) => {
  const { name, email, score } = req.body;
  try {
    const result = await appendRow('Sheet1!A1', [name, email, score]);
    res.json({ message: 'Row added', result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
