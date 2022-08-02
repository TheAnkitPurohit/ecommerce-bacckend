const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");
const { body } = require("express-validator");

// signup
router.post(
  "/signup",
  [
    body("name", "name should be at least 3 char").exists(), //name is required,
    body("email", "email is required").isEmail(), // email is not valid
    body("password", "password should be at least 5 char").isLength({ min: 5 }), // password must be at least 5 chars long
  ],
  signup
);

// signin
router.post(
  "/signin",
  [
    body("email", "email is required").isEmail(), // email is not valid
    body("password", "Password can't be empty").exists(), // password is required
  ],
  signin
);

// sign out
router.get("/signout", signout);

module.exports = router;
