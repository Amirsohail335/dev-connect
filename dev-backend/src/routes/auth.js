const express = require("express");
const { validationSignUpData } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

// SignUp User

authRouter.post("/signup", async (req, res) => {
  try {
    validationSignUpData(req);

    // const user = new User(req.body);

    const { firstName, lastName, emailId, password } = req.body;
    //Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //Creating new instance
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User is successfully added");
  } catch (error) {
    res.status(400).send("Erro :" + error.message);
  }
});

//Login User

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      // return res.status(400).send("User not found");
      throw new Error("Invalid Credetials");
    }

    // Compare password
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      //Add token to Cookies and send response back to user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login successful ✅");
    } else {
      throw new Error("Invalid Loginn Credentials");
    }
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

module.exports = authRouter;
