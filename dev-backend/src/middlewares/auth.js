const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked");

  const token = "xyz";
  const authorisedToken = token === "xyz";
  if (!authorisedToken) {
    res.status(401).send("Unauthorised Access");
  } else {
    next();
  }
};

module.exports = {
  adminAuth,
};
