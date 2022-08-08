const User = require("../models/User");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { expressjwt: expressJwt } = require("express-jwt");

exports.signup = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  let user = new User(req.body);

  try {
    user = await user.save();
    res.json({
      name: user.name,
      email: user.email,
      id: user._id,
    });
  } catch (error) {
    return res.status(400).json({ err: "NOT able to save user in DB" });
  }
};

exports.signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user.autheticate(req.body.password)) {
      return res.status(401).json({
        error: "Email and password do not match",
      });
    }
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });

    //send response to front end
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  } catch (error) {
    return res.status(400).json({
      error: "USER email does not exists",
    });
  }
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "User signout successfully",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  algorithms: ["HS256"],
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "ACCESS DENIED",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "You are not ADMIN, Access denied",
    });
  }
  next();
};
