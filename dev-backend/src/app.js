const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookiesParser = require("cookie-parser");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookiesParser());

//Routes
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

//Get user by email
// app.get("/user", async (req, res) => {
//   const UserEmail = req.body.emailId;

//   try {
//     const users = await User.find({ emailId: UserEmail });
//     if (users.length == 0) {
//       res.send(403).send("User not found!");
//     } else {
//       res.send(users);
//     }
//   } catch (error) {
//     res.status(400).send("Something went wrong!!!!");
//   }
// });

// //Get all users from the database

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.send(users);
//   } catch (error) {
//     res.status(400).send("Something went wrong!!!!");
//   }
// });

connectDB()
  .then(() => {
    console.log("The Database is a connected successfully...");
    app.listen(3000, () => {
      console.log("Listening on port 3000");
    });
  })
  .catch((err) => {
    console.log("Database cannot be connected!!!");
  });
