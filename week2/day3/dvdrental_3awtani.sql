\c dvdrental

SELECT count(*) FROM rental WHERE return_date IS NULL -- if return_date is null meaning that the data about it is missing which means the movie hasn't returned yet

SELECT c.customer_id, c.first_name, c.last_name, COUNT(r.rental_id) AS outstanding_rentals FROM rental r
JOIN customer c ON r.customer_id = c.customer_id WHERE r.return_date IS NULL
GROUP BY c.customer_id, c.first_name, c.last_name ORDER BY outstanding_rentals DESC;

--normal query:
SELECT f.title, a.first_name, a.last_name, c.name AS category_name FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id
where a.first_name ='Joe' and a.last_name='Swank' and c.name = 'Action';

-- with view:
CREATE VIEW actor_film_category AS
SELECT f.title, a.first_name, a.last_name, c.name AS category_name
FROM film f
JOIN film_actor fa ON f.film_id = fa.film_id
JOIN actor a ON fa.actor_id = a.actor_id
JOIN film_category fc ON f.film_id = fc.film_id
JOIN category c ON fc.category_id = c.category_id;

SELECT title
FROM actor_film_category
WHERE first_name = 'Joe' AND last_name = 'Swank' AND category_name = 'Action';
--idk if this is a shortcut.. maybe to a routine data maybe..