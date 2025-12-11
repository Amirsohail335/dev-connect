const jwt = require("jsonwebtoken");
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

const userAuth = (req, res, next) => {
  //Read the token from the req cookies
  const { token } = req.cookies;

  const decodedObj = jwt.verify(token, "DEV@Tinder@790");
};
module.exports = {
  // adminAuth,
  userAuth,
};
