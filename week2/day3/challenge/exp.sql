CREATE DATABASE daily_challenge_exp;

\c daily_challenge_exp

CREATE TABLE users (id SERIAL PRIMARY KEY, name TEXT NOT NULL);

CREATE TABLE product_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES product_orders(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price >= 0)
);

-- Function to get the total price of an order
CREATE FUNCTION get_order_total(order_id INTEGER) RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10,2);
BEGIN
    SELECT COALESCE(SUM(price), 0) INTO total FROM items WHERE order_id = $1;
    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Function to get the total price of an order for a specific user
CREATE FUNCTION get_user_order_total(user_id INTEGER, order_id INTEGER) RETURNS NUMERIC AS $$
DECLARE
    total NUMERIC(10,2);
BEGIN
    SELECT COALESCE(SUM(items.price), 0) INTO total
    FROM items
    JOIN product_orders ON items.order_id = product_orders.id
    WHERE product_orders.user_id = $1 AND product_orders.id = $2;
    
    RETURN total;
END;
$$ LANGUAGE plpgsql;
