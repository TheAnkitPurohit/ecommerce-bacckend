const express = require("express");
const router = express.Router();
const { signup, signin, signout } = require("../controllers/auth");

// signup
router.post("/signup", signup);

// signin
router.post("/signin", signin);

// sign out
router.post("/signout", signout);

module.exports = router;
