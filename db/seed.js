const pool = require('./pool');

const SQL = `
CREATE TABLE IF NOT EXISTS product(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) UNIQUE,
    quantity INTEGER
);

CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_name VARCHAR(255),
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255)
);

INSERT INTO product ("product_name", "quantity")
    VALUES ('biscuits', 2)
    ON CONFLICT (product_name) DO NOTHING;

INSERT INTO product ("product_name", "quantity")
    VALUES ('Mercedes Benz C200', 4)
    ON CONFLICT (product_name) DO NOTHING;

INSERT INTO categories (category_name, product_id)
    VALUES ('snacks', 1);

INSERT INTO categories (category_name, product_id)
    VALUES ('Cars', 2);

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