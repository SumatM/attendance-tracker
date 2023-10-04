const googleSheets = require("../googleSheet/googleSheets");
const userModel = require("../model/student.model");

async function updateSheetMiddleware(req, res, next) {
  const { userId, spreadsheetId, range, values } = req.body;

  value = ["aman", "P"];

  const user = await userModel.findOne({ _id: userId });
console.log(user)
  googleSheets
    .updateSpreadsheet(user.accessToken, spreadsheetId, range, values)
    .then((result) => {
      req.googleSheetsResult = result;
      next();
    })
    .catch((error) => {
      console.error("Error updating sheet:", error);
      res.status(500).json({ error: "Internal Server Error" });
    });
}

module.exports = {
  updateSheetMiddleware,
};
