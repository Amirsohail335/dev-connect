const express = require("express");

const app = express();

app.use("/home", (req, res) => {
  res.send("Welcome to the Dev Connect");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
