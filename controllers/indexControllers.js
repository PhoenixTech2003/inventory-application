const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.renderIndex = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("index", { title: "Categories", categories: categories });
});

exports.renderItems = asyncHandler(async (req, res) => {
  const category = req.params.category;

  const items = await db.getAllItemsForCategory(category);
  console.log(items);
  if (items.length === 0) {
    res.render("items", { title: category, items: [] });
    return;
  }
  const categoryName = items[0].category_name;
  console.log(categoryName);
  res.render("items", { title: categoryName, items: items });
});
