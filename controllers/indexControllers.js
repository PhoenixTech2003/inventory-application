const asyncHandler = require("express-async-handler");
const {
  body,
  vijalidationResult,
  validationResult,
} = require("express-validator");
const db = require("../db/queries");

const validateCategory = [
  body("category_name").trim().notEmpty().withMessage("Please enter a value"),
];

exports.renderIndex = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("index", { title: "Categories", categories: categories });
});

exports.renderItems = asyncHandler(async (req, res) => {
  const category = req.params.category;

  const items = await db.getAllItemsForCategory(category);

  if (items.length === 0) {
    res.render("items", { title: category, items: [] });
    return;
  }
  const categoryName = items[0].category_name;

  res.render("items", { title: categoryName, items: items });
});

exports.deleteItem = asyncHandler(async (req, res) => {
  const itemName = req.body.product_name;
  const categoryName = req.body.category_name;
  await db.deleteItem(itemName);
  res.redirect(`/items/${categoryName}`);
});

exports.deleteCategory = asyncHandler(async (req, res) => {
  const categoryName = req.body.category_name;
  await db.deleteCategory(categoryName);
  res.redirect("/");
});

exports.renderUpdateCategory = asyncHandler(async (req, res) => {
  const categoryName = req.query.category;
  res.render("updateCategory", {
    title: "Update Category",
    categoryName: categoryName,
  });
});

exports.updateCategory = [
  validateCategory,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const currentCategoryName = req.body.category;
    const newCategoryName = req.body.category_name;
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("updateCategory", {
          title: "Update Category",
          categoryName: currentCategoryName,
          errors: errors.array(),
        });
    }

    await db.updateCategory(newCategoryName, currentCategoryName);
    res.redirect("/");
  }),
];
