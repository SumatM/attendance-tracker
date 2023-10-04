
const express = require("express");
const  studentModel  = require("../model/student.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticate } = require("../middleware/authenticator.middleware");

const userRoute = express.Router();

    userRoute.use(authenticate)

// user can see his details
userRoute.get("/", async (req, res) => {
  try {
    const user = await studentModel.findOne({ _id: req.body.userId });
    console.log(user)
    res.status(200).json({ message: "User Information", user });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// signup or create new user
userRoute.post("/", async (req, res) => {
  try {
    // console.log(req)
    const { email, password } = req.body;
    const user = await studentModel.findOne({ email });

    if (!user) {
      bcrypt.hash(password, 3, (err, hash) => {
        if (!err) {
          const newUser = new studentModel({ ...req.body, password: hash });
          newUser.save();
          res.status(201).json({ message: "User Created", user: newUser });
        } else {
         console.log('hash err',err)
          res.status(400).json({ error: err });
        }
      });
    } else {
      res.status(200).json({ message: "User Already Exists" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
});

module.exports = { userRoute };
