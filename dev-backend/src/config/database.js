const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://amirsohail0212:Amir335@dev-connect.4snaktw.mongodb.net/dev-connect"
  );
};

module.exports = connectDB;


