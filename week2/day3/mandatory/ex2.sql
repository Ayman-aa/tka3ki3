\c dvdrental

UPDATE film SET language_id = 2 WHERE film_id IN (1, 2, 3);
UPDATE film SET language_id = 3 WHERE film_id BETWEEN 10 AND 15;
UPDATE film SET language_id = 5 WHERE title LIKE '%man%';

A2:
-- we have two foreign keys, store_id and address_id
-- upon inserting new records we need to check if the foreign keys values exist in their defined table

A3:
-- since the customer_review table has foreign keys in it, we usually either drop the keys
-- or droping the table with :
DROP TABLE customer_review CASCADE;

SELECT count(*) FROM rental WHERE return_date IS NULL


SELECT f.title, f.rental_rate, COUNT(r.rental_id) AS outstanding_rentals FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id
WHERE r.return_date IS NULL GROUP BY f.title, f.rental_rate ORDER BY f.rental_rate DESC
LIMIT 30;


SELECT f.title FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id JOIN actor a ON fa.actor_id = a.actor_id
WHERE f.description ILIKE '%sumo%' AND a.first_name = 'Penelope' AND a.last_name = 'Monroe';


SELECT f.title FROM film f
JOIN film_category fc ON f.film_id = fc.film_id JOIN category c ON fc.category_id = c.category_id
WHERE f.length < 60 AND f.rating = 'R' AND c.name = 'Documentary';

SELECT f.title FROM rental r 
JOIN payment p ON r.rental_id = p.rental_id JOIN inventory i ON r.inventory_id = i.inventory_id
JOIN film f ON i.film_id = f.film_id JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND p.amount > 4.00
AND r.return_date BETWEEN '2005-07-28' AND '2005-08-01';

SELECT f.title, f.replacement_cost FROM rental r
JOIN inventory i ON r.inventory_id = i.inventory_id JOIN film f ON i.film_id = f.film_id
JOIN customer c ON r.customer_id = c.customer_id
WHERE c.first_name = 'Matthew' AND c.last_name = 'Mahan' AND (f.title ILIKE '%boat%' OR f.description ILIKE '%boat%')
ORDER BY f.replacement_cost DESC LIMIT 1;