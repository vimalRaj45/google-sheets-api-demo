

const { google } = require('googleapis');

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getAuth() {
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
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
