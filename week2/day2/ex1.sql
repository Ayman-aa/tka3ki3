CREATE DATABASE public;

\c public


CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INTEGER NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL
);


INSERT INTO items (id, name, price) VALUES
(1, 'Small Desk', 100),
(2, 'Large desk', 300),
(3, 'Fan', 80);


INSERT INTO customers (id, first_name, last_name) VALUES
(1, 'Greg', 'Jones'),
(2, 'Sandra', 'Jones'),
(3, 'Scott', 'Scott'),
(4, 'Trevor', 'Green'),
(5, 'Melanie', 'Johnson');

SELECT * FROM items ORDER BY price ASC;

SELECT * FROM items WHERE price >= 80 ORDER BY price DESC;

SELECT first_name, last_name FROM customers ORDER BY first_name ASC LIMIT 3;

SELECT last_name FROM customers ORDER BY last_name DESC;
