const pool = require('./pool')


 async function getAllCategories(){
    const categories = await pool.query("SELECT id, category_name FROM categories")
    return categories.rows;
}

module.exports = {
    getAllCategories
}