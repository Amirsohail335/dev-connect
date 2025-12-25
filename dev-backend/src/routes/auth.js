// const express = require("express");
// const { validationSignUpData } = require("../utils/validation");
// const authRouter = express.Router();
// const User = require("../models/user");
// const bcrypt = require("bcrypt");

// // SignUp User

// authRouter.post("/signup", async (req, res) => {
//   try {
//     validationSignUpData(req);

//     // const user = new User(req.body);

//     const { firstName, lastName, emailId, password } = req.body;
//     //Encrypt the password
//     const passwordHash = await bcrypt.hash(password, 10);
//     console.log(passwordHash);

//     //Creating new instance
//     const user = new User({
//       firstName,
//       lastName,
//       emailId,
//       password: passwordHash,
//     });

//     await user.save();
//     res.send("User is successfully added");
//   } catch (error) {
//     res.status(400).send("Erro :" + error.message);
//   }
// });

// //Login User

// authRouter.post("/login", async (req, res) => {
//   try {
//     const { emailId, password } = req.body;

//     // Check if user exists
//     const user = await User.findOne({ emailId: emailId });
//     if (!user) {
//       // return res.status(400).send("User not found");
//       throw new Error("Invalid Credetials");
//     }

//     // Compare password
//     const isPasswordValid = await user.validatePassword(password);
//     if (isPasswordValid) {
//       const token = await user.getJWT();
//       // //Add token to Cookies and send response back to user
//       // res.cookie("token", token, {
//       //   expires: new Date(Date.now() + 8 * 3600000),
//       // });
//       // ✅ FIXED COOKIE
//       res.cookie("token", token, {
//         httpOnly: true,
//         sameSite: "lax",
//         expires: new Date(Date.now() + 8 * 60 * 60 * 1000), // 8 hrs
//       });
//       // res.send("Login successful ✅");
//       res.send(user);
//     } else {
//       throw new Error("Invalid Loginn Credentials");
//     }
//   } catch (error) {
//     res.status(400).send("Error: " + error.message);
//   }
// });

// //Logout User

// authRouter.post("/logout", async (req, res) => {
//   // res.cookie("token", null, {
//   //   expires: new Date(Date.now()),
//   // });
//   res.clearCookie("token", {
//     httpOnly: true,
//     sameSite: "lax",
//   });
//   res.send("Logout Successful !!");
// });

// module.exports = authRouter;

const express = require("express");
const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res) => {
  try {
    // Validation of data
    validateSignUpData(req);

    const { firstName, lastName, emailId, password } = req.body;

    // Encrypt the password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //   Creating a new instance of the User model
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
  } catch (err) {
    res.status(400).send("ERROR signup : " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send("Logout Successful!!");
});

module.exports = authRouter;
