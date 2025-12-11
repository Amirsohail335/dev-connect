const jwt = require("jsonwebtoken");

const User = require("../models/user");
// const adminAuth = (req, res, next) => {
//   console.log("Admin auth is getting checked");

//   const token = "xyz";
//   const authorisedToken = token === "xyz";
//   if (!authorisedToken) {
//     res.status(401).send("Unauthorised Access");
//   } else {
//     next();
//   }
// };

const userAuth = async (req, res, next) => {
  //Read the token from the req cookies
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token is not valid");
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder@790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
};
module.exports = {
  // adminAuth,
  userAuth,
};
