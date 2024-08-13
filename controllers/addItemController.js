const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.renderAddItems = asyncHandler(async (req, res) => {
  const categories = db.getAllCategories();
  res.render("add-items", { title: "Add Items", categories: categories });
});

exports.insertProducts = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const quantity = req.body.quantity;
  const category = req.body.category;
  const categoryId = await db.postItem(name, quantity, category);
  res.redirect(`/items/${categoryId}`);
});
