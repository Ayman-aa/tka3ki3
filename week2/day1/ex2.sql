CREATE DATABASE bootcamp;

\c bootcamp

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL
);

--date fromated to YYYY-MM-DD
INSERT INTO students (id, first_name, last_name, birth_date) VALUES
(1, 'Marc', 'Benichou', '1998-11-02'),
(2, 'Yoan', 'Cohen', '2010-12-03'),
(3, 'Lea', 'Benichou', '1987-07-27'),
(4, 'Amelia', 'Dux', '1996-04-07'),
(5, 'David', 'Grez', '2003-06-14'),
(6, 'Omer', 'Simpson', '1980-10-03');

INSERT INTO students (first_name, last_name, birth_date) VALUES
('Ayman', 'Aamam', '2001-01-02');

-- SELECT queries
SELECT * FROM students;

SELECT first_name, last_name FROM students;

SELECT first_name, last_name FROM students WHERE id = 2;

SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' AND first_name = 'Marc';

SELECT first_name, last_name FROM students WHERE last_name = 'Benichou' OR first_name = 'Marc';

SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a%';

SELECT first_name, last_name FROM students WHERE first_name ILIKE 'a%';

SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a';

SELECT first_name, last_name FROM students WHERE first_name ILIKE '%a_';

SELECT first_name, last_name FROM students WHERE id IN (1, 3);

SELECT * FROM students WHERE birth_date >= '2000-01-01';

-- ex2 continue
SELECT first_name, last_name, birth_date FROM students ORDER BY last_name ASC LIMIT 4;

SELECT first_name, last_name, birth_date FROM students ORDER BY birth_date DESC LIMIT 1;

SELECT first_name, last_name, birth_date FROM students ORDER BY id ASC OFFSET 2 LIMIT 3;
