const pool = require("./pool");

async function getAllCategories() {
  const categories = await pool.query(
    "SELECT id, category_name FROM categories",
  );
  return categories.rows;
}

async function getAllItemsForCategory(id) {
  const items = await pool.query(
    "SELECT product_name , quantity, category_name FROM product join categories on product.id = categories.id WHERE categories.id = $1;",
    [id],
  );

  return items.rows;
}

module.exports = {
  getAllCategories,
  getAllItemsForCategory
};
