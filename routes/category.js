const express = require("express");
const router = express.Router();

// controllers
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getCategoryId,
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

//params
router.param("userId", getUserById);
router.param("categoryId", getCategoryId);

// Create Route
router.post(
  "/category/create/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);
// Get Route
router.get("/category/:categoryId", getCategory);
router.get("/categories", getAllCategory);

// Update Route
router.put(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  updateCategory
);

// Delete Route
router.delete(
  "/category/:categoryId/:userId",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  deleteCategory
);

module.exports = router;
