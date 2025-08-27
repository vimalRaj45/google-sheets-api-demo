const { google } = require('googleapis');

// Parse the service account JSON from environment variable
// In Vercel, set GOOGLE_SERVICE_ACCOUNT_JSON and SPREADSHEET_ID in Project Settings → Environment Variables
const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const SPREADSHEET_ID = process.env.SPREADSHEET_ID; // your sheet ID set in env

async function getAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'], // read/write scope
  });
  return auth.getClient();
}

async function readSheet(range) {
  const authClient = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  return res.data.values || [];
}

async function appendRow(range, row) {
  const authClient = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
    valueInputOption: 'USER_ENTERED',
    resource: {
      values: [row],
    },
  });

  return res.data.updates;
}

module.exports = { readSheet, appendRow };
