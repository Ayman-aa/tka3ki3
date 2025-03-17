A1:
-- 'SELECT id FROM SecondTab WHERE id IS NULL' returns NULL
-- there for 'NOT IN (NULL)' return NULL
-- and then 'SELECT COUNT(*) FROM FirstTab' will return nothing
The query will return 0;

A2:
-- 'SELECT id FROM SecondTab WHERE id = 5' will return 5 
-- resulting in NULL NOT IN (5)
--  there for '6 (Sharlee), 7 (Krish)' will be considered
the query will return 2;

A3:
-- 'SELECT id FROM SecondTab' returns (5, NULL)
-- and NOT IN fails when any value in the subquery is NULL
-- Therefore, no rows are returned.
the query will return 0;

A4:
-- 'SELECT id FROM SecondTab WHERE id IS NOT NULL' returns 5
-- 'ft.id NOT IN (5)' results in showing the left rows '6 (Sharlee), 7 (Krish)'
the query will return 2; 