const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validationSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const app = express();
const cookiesParser = require("cookie-parser");

app.use(express.json());
app.use(cookiesParser());

//Get user by email
app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: UserEmail });
    if (users.length == 0) {
      res.send(403).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong!!!");
  }
});

//Get all users from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong!!!!");
  }
});
// SignUp User

app.post("/signup", async (req, res) => {
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("User not found");
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid credentials Password");
    }

    // Add token to the call
    res.cookie("token", "asdajhdhwierhe8383fdfjdnvjnv");

    res.send("Login successful ✅");
  } catch (error) {
    res.status(400).send("Error: " + error.message);
  }
});

app.get("/profile", async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  res.send("Reading cookies");
});

connectDB()
  .then(() => {
    console.log("Database is connected successfully...");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!");
  });
