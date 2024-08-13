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

async function postItem(name, quantity) {
    await pool.query("INSERT INTO product(product_name, quantity) VALUES ($1, $2)", [name, quantity]);
    return "Success"
}

module.exports = {
  getAllCategories,
  getAllItemsForCategory,
  postItem
};
