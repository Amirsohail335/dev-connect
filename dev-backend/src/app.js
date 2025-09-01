const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

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
