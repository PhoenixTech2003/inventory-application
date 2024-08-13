const pool = require("./pool");

async function getAllCategories() {
  const categories = await pool.query(
    "SELECT DISTINCT category_name FROM categories",
  );
  return categories.rows;
}

async function getAllItemsForCategory(categoryName) {
  const items = await pool.query(
    "SELECT product_name , quantity, category_name FROM product join categories on product.id = categories.id WHERE categories.category_name = $1;",
    [categoryName],
  );

  return items.rows;
}

async function postItem(name, quantity, category) {
  await pool.query(
    "INSERT INTO product(product_name, quantity) VALUES ($1, $2)",
    [name, quantity],
  );
  const itemIdRow = await pool.query(
    "SELECT id FROM product WHERE product_name = $1",
    [name],
  );
  const itemId = itemIdRow.rows[0].id;
  await pool.query(
    "INSERT INTO categories (category_name, product_id) VALUES ($1, $2)",
    [category, itemId],
  );
  const categoryName = await pool.query(
    "SELECT category_name FROM categories WHERE product_id = $1",
    [itemId],
  );
  return categoryName.rows[0].category_name;
}

module.exports = {
  getAllCategories,
  getAllItemsForCategory,
  postItem,
};
