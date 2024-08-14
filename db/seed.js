const pool = require("./pool");

const SQL = `
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS product (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER,
    product_name VARCHAR(255) UNIQUE,
    quantity INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

INSERT INTO categories (category_name)
    VALUES ('Snacks');

INSERT INTO categories (category_name)
    VALUES ('Cars');

INSERT INTO product (product_name, quantity, category_id)
    VALUES ('biscuits', 2, 1)
    ON CONFLICT (product_name) DO NOTHING;

INSERT INTO product (product_name, quantity, category_id)
    VALUES ('Mercedes Benz C200', 4, 2)
    ON CONFLICT (product_name) DO NOTHING;


`;

async function main() {
  try {
    console.log("seeding.....");
    await pool.query(SQL);
    console.log("seeding complete");
  } catch (error) {
    console.error("An error occurred while seeding the database", error);
  } finally {
    pool.end();
  }
}

main();
