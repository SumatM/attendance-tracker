const express = require("express");
const authRoute = express.Router();
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const studentModel = require("../model/student.model");
require("dotenv").config();

authRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRoute.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  async function (req, res) {
    try {
      const { user } = req.user;
      const { email } = user.profile;
      const users = await studentModel.findOne({ email });
      console.log('users',users)
      if (!users) {
        bcrypt.hash(user.accessToken, 3, (err, hash) => {
          if (!err) {
            const newUser = new studentModel({ ...user.profile, password: hash,accessToken:user.accessToken });
            const token = jwt.sign(
              { userId: newUser._id },
              process.env.JWT_KEY,
              {
                expiresIn: "1day",
              }
            );
            console.log(newUser._id)
            newUser.save();
            res
              .status(201)
              .json({ message: "User Created", user: newUser, token });
          } else {
            console.log("hash err", err);
            res.status(400).json({ error: err });
          }
        });
      } else {
        const token = jwt.sign({ userId: users._id }, process.env.JWT_KEY, {
          expiresIn: "1day",
        });
        console.log(token)
        res.status(200).json({ message: "Login Success", token });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: err });
    }
  }
);

module.exports = { authRoute };
