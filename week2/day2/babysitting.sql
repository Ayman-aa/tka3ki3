\c dvdrental

SELECT rating, COUNT(*) AS film_count FROM film GROUP BY rating;

SELECT title, length, rental_rate, rating FROM film
WHERE (rating = 'G' OR rating = 'PG-13')
  AND length < 120
  AND rental_rate < 3.00
ORDER BY title;

UPDATE customer SET first_name = 'baby', last_name = 'sitter' WHERE customer_id = 1;

UPDATE address SET address = 'derb douam', city_id = 300, postal_code = '20400', phone = '123-456-7890' WHERE address_id = (SELECT address_id FROM customer WHERE customer_id = 1); 