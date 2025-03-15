CREATE DATABASE daily;

\c daily;

CREATE TABLE actors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL
);

INSERT INTO actors (id, name, role) VALUES
(1, 'Jhonny', 'Polytechnic'),
(2, 'Mikasa', 'Main'),
(3, 'Vegeta', ''); -- empty entry

SELECT COUNT(*) FROM actors

