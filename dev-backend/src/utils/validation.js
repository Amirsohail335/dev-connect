const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  // Validate firstName and lastName
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (firstName.length < 4 || firstName.length > 50) {
    throw new Error("First name should be between 4-50 characters");
  }

  // Validate email using validator
  if (!validator.isEmail(emailId)) {
    throw new Error("Invalid email address");
  }

  // You can also validate password strength if needed
  // Validate password strength
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters long and include 1 lowercase, 1 uppercase, 1 number, and 1 symbol"
    );
  }
};

module.exports={
    validationSignUpData
}
