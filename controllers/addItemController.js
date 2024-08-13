const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateItem = [
  body("product_name")
    .trim()
    .notEmpty()
    .withMessage("Product name must have a value"),
  body("quantity")
    .trim()
    .isNumeric()
    .withMessage("Quantity must contain numbers only"),
  body("category").trim().notEmpty().withMessage("Please select a category"),
];

exports.renderAddItems = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories();
  res.render("addItems", { title: "Add Items", categories: categories });
});

exports.insertProducts = [
  validateItem,

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    const categories = await db.getAllCategories();

    if (!errors.isEmpty()) {
      return res.status(400).render("addItems", {
        title: "Add Item",
        errors: errors.array(),
        categories: categories,
      });
    }
    const name = req.body.product_name;
    const quantity = Number(req.body.quantity);
    const category = req.body.category;
    const categoryName = await db.postItem(name, quantity, category);
    res.redirect(`/items/${categoryName}`);
  }),
];
