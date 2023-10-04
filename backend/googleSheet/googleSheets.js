// googleSheets.js

const { google } = require("googleapis");

function getGoogleSheetsClient(accessToken) {
  const oAuth2Client = new google.auth.OAuth2();
  oAuth2Client.setCredentials({ access_token: accessToken });
  return google.sheets({ version: "v4", auth: oAuth2Client });
}

function updateSpreadsheet(accessToken, spreadsheetId, range, values) {
  const sheets = getGoogleSheetsClient(accessToken);

  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.update(
      {
        spreadsheetId,
        range,
        valueInputOption: "RAW",
        resource: {
          values,
        },
      },
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res.data);
        }
      }
    );
  });
}

module.exports = {
  updateSpreadsheet,
};
