const mongoose = require("mongoose");

const categorySchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
      maxLength: 32,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Category", categorySchmea);

module.exports = Category;
