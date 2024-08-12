const asyncHandler = require("express-async-handler");
const db = require("../db/queries")

exports.renderIndex = asyncHandler(async (req, res) => {
  const categories = await db.getAllCategories()
  res.render("index", {title:'Categories',categories:categories} );
});
