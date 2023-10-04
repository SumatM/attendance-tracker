const express = require("express");
const studentModel = require("../model/student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware/authenticator.middleware");
const { attendanceModel } = require("../model/attendance.model");

const attendanceRoute = express.Router();

attendanceRoute.use(authenticate);

attendanceRoute.get("/", async (req, res) => {
  try {
    const attendanceList = await attendanceModel.find({
      userId: req.body.userId,
    });

    console.log(attendanceList);

    res.status(200).json({ message: "List", attendanceList });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

attendanceRoute.post("/", async (req, res) => {
  try {
    let present = new attendanceModel({...req.body})
    present.save()
    res.status(200).json({message:"Mark Present",attendance:present})
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { attendanceRoute };
