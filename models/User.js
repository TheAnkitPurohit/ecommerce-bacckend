const mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

const userSchmea = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength:32,
  },
  lastname: {
    type: String,
    trim: true,
    maxLength:32,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
  userInfo: {
    type: String,
    trim: true,
  },
  encry_password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  role: {
    type: Number,
    default: 0,
  },
  purchases: {
    type: Array,
    default: [],
  },
}, {
    timestamps:true,
});

userSchmea
  .virtual()
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchmea.methods = {
     authenticate: function(plainpassword){
        return this.securePassword(plainpassword) = this.encry_password
    },


    securePassword: function (plainpassword) {
    if (!plainpassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(plainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

const User = mongoose.model("User", userSchmea);

module.exports = User;