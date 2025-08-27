const { google } = require('googleapis');

const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

async function getAuth() {
  console.log('Initializing Google Auth...');
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: SCOPES,
  });
  const client = await auth.getClient();
  console.log('Google Auth initialized successfully.');
  return client;
}

async function readSheet(range) {
  console.log(`Reading sheet: ${SPREADSHEET_ID}, range: ${range}`);
  const authClient = await getAuth();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: range,
  });

  console.log('Sheet data retrieved successfully.');
  return res.data.values || [];
}

async function appendRow(range, row) {
  console.log(`Appending row to range ${range}`, row);
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

  console.log('Row appended successfully.');
  return res.data.updates;
}

module.exports = { readSheet, appendRow };
