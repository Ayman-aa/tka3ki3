CREATE DATABASE store;

\c store

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50)
);

INSERT INTO customers (first_name, last_name) VALUES 
('Greg', 'Jones'),
('John', 'Doe'),
('Scott', 'Scott'),
('Jane', 'Doe'),
('Melanie', 'Johnson');

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(50)
);

INSERT INTO items (item_name) VALUES 
('Small Desk'),
('Large Desk'),
('Fan'),
('Chair'),
('Lamp');


CREATE TABLE purchases (
    id SERIAL PRIMARY KEY,
    customer_id INT,
    item_id INT,
    quantity_purchased INT,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
    (SELECT id FROM items WHERE item_name = 'Fan'),
    1
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
    (SELECT id FROM items WHERE item_name = 'Large Desk'),
    10
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (
    (SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
    (SELECT id FROM items WHERE item_name = 'Small Desk'),
    2
);

--part 2:

SELECT * FROM purchases;

SELECT p.id, c.first_name, c.last_name, p.item_id, p.quantity_purchased
FROM purchases p
JOIN customers c ON p.customer_id = c.id;

SELECT * FROM purchases WHERE customer_id = 5;

SELECT customer_id FROM purchases 
WHERE item_id IN (
    (SELECT id FROM items WHERE item_name = 'Large Desk'),
    (SELECT id FROM items WHERE item_name = 'Small Desk')
) 
GROUP BY customer_id
HAVING COUNT(DISTINCT item_id) = 2;
