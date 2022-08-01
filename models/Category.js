const mongoose = require("mongoose");

const categorySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxLength: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchmea);
