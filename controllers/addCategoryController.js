const asyncHandler = require("express-async-handler");
const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

const validateProduct = [
  body("category_name")
    .trim()
    .notEmpty()
    .withMessage("Please fill in the categories field"),
];

exports.renderAddCategories = asyncHandler(async (req, res) => {
  res.render("addCategory", { title: "Add Category" });
});

exports.addCategories = [
  validateProduct,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res
        .status(400)
        .render("addCategory", {
          title: "Add Category",
          errors: errors.array(),
        });
      return;
    }
    const { category_name } = req.body;
    await db.createCategory(category_name);
    res.redirect("/");
  }),
];
