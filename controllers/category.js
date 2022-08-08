const Category = require("../models/Category");

exports.getCategoryId = async (req, res, next, id) => {
  try {
    let category = await Category.findById(id);
    req.category = category;
    next();
  } catch (error) {
    return res.status(400).json({
      error: "Category is not found!!",
    });
  }
};

//create Category
exports.createCategory = async (req, res) => {
  let category = new Category(req.body);
  try {
    let newCategory = await category.save();
    res.status(200).json(newCategory);
  } catch (error) {
    return res.status(400).json({
      error: "Not able to save category in DB.",
    });
  }
};

//get Category
exports.getCategory = (req, res) => {
  console.log(req.category);
  return res.status(200).json({ category: req.category });
};

// get All Categories
exports.getAllCategory = async (req, res) => {
  try {
    let categories = await Category.find();
    res.status(200).json({ categories });
  } catch (error) {
    return res.status(400).json({
      error: "No Categories were found",
    });
  }
};

//update Category
exports.updateCategory = async (req, res) => {
  try {
    const category = req.category;
    category.name = req.body.name;
    const updatedCategory = await category.save();
    return res.status(200).json({ updatedCategory });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to update the category",
    });
  }
};

//delete Category
exports.deleteCategory = async (req, res) => {
  const category = req.category;
  console.log(req.category);

  try {
    let removeCagetory = await category.remove();
    res.json({
      message: "Successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      error: "Failed to delete the category",
    });
  }
};
