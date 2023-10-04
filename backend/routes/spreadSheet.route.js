const express = require("express");
const gSheetRouter = express.Router();
const googleSheetsMiddleware = require("../middleware/gSheet.middleware");
const { authenticate } = require("../middleware/authenticator.middleware");

gSheetRouter.use(authenticate);

gSheetRouter.post(
  "/",
  googleSheetsMiddleware.updateSheetMiddleware,
  (req, res) => {
    const { googleSheetsResult } = req;
    res.status(200).json({
      message: "Sheet updated successfully",
      result: googleSheetsResult,
    });
  }
);

module.exports = gSheetRouter;
