const User = require("../models/User");
const Order = require("../models/Order");

exports.getUserById = async (req, res, next, id) => {
  try {
    let user = await User.findById(id);
    req.profile = user;
    next();
  } catch (error) {
    res.status(400).json({ error: "No User was found in DB" });
  }
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      { _id: req.profile._id },
      { $set: req.body },
      { new: true, useFindAndModify: false }
    );
    user.salt = undefined;
    user.encry_password = undefined;
    user.createdAt = undefined;
    user.updatedAt = undefined;
    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ error: "You are not authorized" });
  }
};

exports.userPurchaseList = async (req, res) => {
  try {
    let order = await Order.find({ user: req.profile._id }).populate(
      "user",
      "_id name"
    );
    return res.json(order);
  } catch (error) {
    return res.status(400).json({
      error: "No Order in this account",
    });
  }
  //   Order.find({ user: req.profile._id })
  //     .populate("user", "_id name")
  //     .exec((err, order) => {
  //       if (err) {
  //         return res.status(400).json({
  //           error: "No Order in this account",
  //         });
  //       }
  //       res.json(order);
  //     });
};

exports.PushOrderInPurchaseList = async (req, res, next) => {
  let purcahses = [];
  req.body.order.products.forEach((product) => {
    purcahses.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  //store in DB
  try {
    await User.findOneAndUpdate(
      { _id: req.profile._id },
      { $push: { purcahses: purcahses } },
      { new: true }
    );
    next();
  } catch (error) {
    res.status(400).json({
      error: "Unable to save purcahse list",
    });
  }
};
