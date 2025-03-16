\c test

CREATE TABLE students (
    id INT PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    birth_date DATE,
    math_grade INT
);

INSERT INTO students (id, first_name, last_name, birth_date, math_grade) VALUES
(1, 'David', 'Grez', '1999-05-15', 80),
(2, 'Lea', 'Benichou', '1998-11-02', 90),
(3, 'Marc', 'Benichou', '1998-11-02', NULL),
(4, 'Sarah', 'Cohen', '2001-07-20', 90),
(5, 'John', 'Doe', '2002-04-10', NULL),
(6, 'Emily', 'Smith', '1997-09-23', 40);

UPDATE students SET birth_date = '1998-11-02' WHERE last_name = 'Benichou';

UPDATE students SET last_name = 'Guez' WHERE first_name = 'David' AND last_name = 'Grez';

DELETE FROM students WHERE first_name = 'Lea' AND last_name = 'Benichou';

SELECT COUNT(*) AS total_students FROM students;

SELECT COUNT(*) AS students_after_2000 FROM students WHERE birth_date > '2000-01-01';

ALTER TABLE students ADD COLUMN math_grade INT;

UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);
UPDATE students SET math_grade = 40 WHERE id = 6;

SELECT COUNT(*) AS students_above_83 FROM students WHERE math_grade > 83;

INSERT INTO students (id, first_name, last_name, birth_date, math_grade) VALUES (7, 'Omer', 'Simpson', '1999-05-15', 70);

INSERT INTO students (id, first_name, last_name, birth_date, math_grade) VALUES (8, 'Omer', 'Simpson', '1999-05-15', 85);

SELECT first_name, last_name, COUNT(math_grade) AS total_grade FROM students GROUP BY first_name, last_name;

SELECT SUM(math_grade) AS total_sum_of_grades FROM students;
