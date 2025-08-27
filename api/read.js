import { readSheet } from '../googleSheets.js';

export default async function handler(req, res) {
  console.log('Incoming request to /api/read:', req.method);

  if (req.method !== 'GET') {
    console.warn('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const data = await readSheet('Sheet1!A1:C100'); // Adjust range if needed
    console.log('Data returned successfully from readSheet.');
    return res.status(200).json({ data });
  } catch (err) {
    console.error('Error reading sheet:', err);
    return res.status(500).json({ error: err.message });
  }
}
