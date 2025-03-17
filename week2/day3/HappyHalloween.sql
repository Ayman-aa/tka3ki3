\c dvdrental

SELECT ci.city, co.country, COUNT(s.store_id) AS total_stores FROM store s
JOIN address a ON s.address_id = a.address_id
JOIN city ci ON a.city_id = ci.city_id JOIN country co ON ci.country_id = co.country_id
GROUP BY ci.city, co.country
ORDER BY total_stores DESC;

SELECT s.store_id, SUM(f.length) / 60 AS total_viewing_hours FROM store s
JOIN inventory i ON s.store_id = i.store_id JOIN film f ON i.film_id = f.film_id
GROUP BY s.store_id
ORDER BY total_viewing_hours DESC;

SELECT c.customer_id, c.first_name, c.last_name, ci.city FROM customer c
JOIN address a ON c.address_id = a.address_id JOIN city ci ON a.city_id = ci.city_id
WHERE ci.city IN (
    SELECT ci.city
    FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
)
ORDER BY ci.city, c.last_name, c.first_name;

SELECT c.customer_id, c.first_name, c.last_name, co.country FROM customer c
JOIN address a ON c.address_id = a.address_id JOIN city ci ON a.city_id = ci.city_id
JOIN country co on ci.country_id = co.country_id
WHERE co.country IN (
    SELECT co.country
    FROM store s
    JOIN address a ON s.address_id = a.address_id
    JOIN city ci ON a.city_id = ci.city_id
	JOIN country co ON ci.country_id = co.country_id
)
ORDER BY co.country, c.last_name, c.first_name;


CREATE TABLE safe_movies AS
SELECT film_id, title, length, description
FROM film
WHERE 
    'Horror' NOT IN (
        SELECT c.name 
        FROM category c
        JOIN film_category fc ON c.category_id = fc.category_id
        WHERE fc.film_id = film.film_id
    )
    AND LOWER(title) NOT LIKE '%beast%'
    AND LOWER(title) NOT LIKE '%monster%' 
    AND LOWER(title) NOT LIKE '%ghost%'
    AND LOWER(title) NOT LIKE '%dead%'
    AND LOWER(title) NOT LIKE '%zombie%'
    AND LOWER(title) NOT LIKE '%undead%'
    AND LOWER(description) NOT LIKE '%beast%'
    AND LOWER(description) NOT LIKE '%monster%'
    AND LOWER(description) NOT LIKE '%ghost%' 
    AND LOWER(description) NOT LIKE '%dead%'
    AND LOWER(description) NOT LIKE '%zombie%'
    AND LOWER(description) NOT LIKE '%undead%';

ALTER TABLE safe_movies
ADD CONSTRAINT check_safe_content
CHECK (
    LOWER(title) NOT LIKE '%beast%' AND
    LOWER(title) NOT LIKE '%monster%' AND
    LOWER(title) NOT LIKE '%ghost%' AND
    LOWER(title) NOT LIKE '%dead%' AND
    LOWER(title) NOT LIKE '%zombie%' AND
    LOWER(title) NOT LIKE '%undead%' AND
    LOWER(description) NOT LIKE '%beast%' AND
    LOWER(description) NOT LIKE '%monster%' AND
    LOWER(description) NOT LIKE '%ghost%' AND
    LOWER(description) NOT LIKE '%dead%' AND
    LOWER(description) NOT LIKE '%zombie%' AND
    LOWER(description) NOT LIKE '%undead%'
);


SELECT 
    SUM(length) AS total_minutes,
    ROUND(SUM(length) / 60.0, 2) AS total_hours,
    ROUND(SUM(length) / (60.0 * 24), 2) AS total_days
FROM 
    film;

SELECT 
    SUM(length) AS total_minutes,
    ROUND(SUM(length) / 60.0, 2) AS total_hours,
    ROUND(SUM(length) / (60.0 * 24), 2) AS total_days
FROM 
    safe_movies;