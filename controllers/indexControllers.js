const asyncHandler = require("express-async-handler");

exports.renderIndex = asyncHandler(async (req, res) => {
  res.render("index");
});
