exports.signup = (req, res) => {
  res.send("Hello Signup");
  console.log(req.body);
};

exports.signin = (req, res) => {
  res.send("Hello Sign In");
};

exports.signout = (req, res) => {
  res.send("Hello Sign out");
};
