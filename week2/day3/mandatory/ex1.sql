\c dvdrental

SELECT * FROM language;

SELECT f.title, f.description, l.name AS language
FROM film f JOIN language l ON f.language_id = l.language_id

SELECT f.title AS film_title, f.description AS film_description, l.name AS language_name
FROM language l LEFT JOIN film f ON l.language_id = f.language_id ORDER BY l.name, f.title;

CREATE TABLE new_film ( id PRIMARY KEY,name VARCHAR(50) NOT NULL);

INSERT INTO new_film (id,name) VALUES 
    (1,'Interstellar'),
    (2,'The Shawshank Redemption'),
    (3,'Inception'),
    (4,'Pulp Fiction'),
    (5,'The Matrix');

CREATE TABLE customer_review ( --should've added a customer id but whatever
    review_id SERIAL PRIMARY KEY,
    film_id INTEGER REFERENCES new_film(id) ON DELETE CASCADE,
    language_id INTEGER REFERENCES language(language_id),
    title VARCHAR(255) NOT NULL,
    score INTEGER CHECK (score BETWEEN 1 AND 10),
    review_text TEXT,
    last_update TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELETE FROM new_film WHERE id = 1;

SELECT * FROM customer_review;