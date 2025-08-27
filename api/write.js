import { appendRow } from '../googleSheets.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, score } = req.body;
  try {
    const result = await appendRow('Sheet1!A1', [name, email, score]);
    return res.status(200).json({ message: 'Row added', result });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
