SELECT f.film_id, f.title, f.rating, f.description FROM film f
WHERE 
    f.rating IN ('G', 'PG')
    AND NOT EXISTS (
        SELECT 1
        FROM rental r
        JOIN inventory i ON r.inventory_id = i.inventory_id
        WHERE i.film_id = f.film_id
        AND r.return_date IS NULL
    );


INSERT INTO childrens_movie_waiting_list (film_id, child_name, contact_info)
VALUES 
    (1, 'Emma Thompson', 'emma.parents@email.com'),
    (1, 'Jack Wilson', 'jack.parents@email.com'),
    (2, 'Sophia Garcia', 'sophia.parents@email.com'),
    (3, 'Oliver Brown', 'oliver.parents@email.com'),
    (3, 'Noah Davis', 'noah.parents@email.com'),
    (3, 'Charlotte Miller', 'charlotte.parents@email.com');

SELECT f.film_id, f.title, f.rating, COUNT(cwl.waiting_id) AS waiting_count
FROM film f LEFT JOIN childrens_movie_waiting_list cwl ON f.film_id = cwl.film_id
WHERE f.rating IN ('G', 'PG') GROUP BY f.film_id, f.title, f.rating
ORDER BY waiting_count DESC;