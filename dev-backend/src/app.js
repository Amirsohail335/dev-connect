const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

//Get user by email
app.get("/user", async (req, res) => {
  const UserEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: UserEmail });
    if (users.length == 0) {
      res.send(403).send("User not found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
});

//Get all users from the database

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(400).send("Something went wrong ");
  }
});

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ms",
    lastName: "Dhoni",
    emailId: "msd07@gmail.com",
    password: "msd@777",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error is saving the user" + err.message);
  }
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
