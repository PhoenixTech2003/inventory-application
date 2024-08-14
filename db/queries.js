const pool = require("./pool");

async function getAllCategories() {
  const categories = await pool.query(
    "SELECT DISTINCT category_name FROM categories",
  );
  return categories.rows;
}

async function getAllItemsForCategory(categoryName) {
  const items = await pool.query(
    "SELECT product_name , quantity, category_name FROM product join categories on product.category_id = categories.id WHERE categories.category_name = $1;",
    [categoryName],
  );

  return items.rows;
}

async function postItem(name, quantity, category) {
  const categoryRow = await pool.query(
    "SELECT id, category_name FROM categories WHERE category_name = $1",
    [category],
  );

  const categoryId = categoryRow.rows[0].id;
  await pool.query(
    "INSERT INTO product(product_name, quantity, category_id) VALUES ($1, $2, $3)",
    [name, quantity, categoryId],
  );

  return categoryRow.rows[0].category_name;
}

async function createCategory(name) {
  await pool.query("INSERT INTO categories (category_name) VALUES ($1)", [
    name,
  ]);
}

async function deleteItem(itemName) {
  await pool.query("DELETE FROM product WHERE product_name = $1", [itemName]);
}

async function deleteCategory(categoryName) {
  await pool.query("DELETE FROM categories WHERE category_name = $1", [
    categoryName,
  ]);
}

async function updateCategory(categoryName, currentCategoryName) {
  await pool.query(
    "UPDATE categories SET category_name = $1 WHERE category_name = $2",
    [categoryName, currentCategoryName],
  );
}

async function updateItem(
  productName,
  quantity,
  currentItemName,
  newCategoryName,
) {
  const categoryRow = await pool.query(
    "SELECT id FROM categories WHERE category_name = $1 ",
    [newCategoryName],
  );
  const categoryId = categoryRow.rows[0].id;
  await pool.query(
    "UPDATE product SET product_name = $1, quantity = $2, category_id = $3 WHERE  product_name = $4",
    [productName, quantity, categoryId, currentItemName],
  );
}

module.exports = {
  getAllCategories,
  getAllItemsForCategory,
  postItem,
  createCategory,
  deleteItem,
  deleteCategory,
  updateCategory,
  updateItem,
};
