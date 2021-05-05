INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("FN", "LN", INT , INT);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("FN", "LN", INT , INT);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("FN", "LN", INT , INT);

INSERT INTO employeerole (title, salary, department_id)
VALUES ("TITLE", INT, INT);

INSERT INTO employeerole (title, salary, department_id)
VALUES ("TITLE", INT, INT);

INSERT INTO employeerole (title, salary, department_id)
VALUES ("TITLE", INT, INT);

INSERT INTO department (name)
VALUES ("DEPTTITLE");

INSERT INTO department (name)
VALUES ("DEPTTITLE");

INSERT INTO department (name)
VALUES ("DEPTTILE");

-- SELECT * FROM table1, table2;

-- SELECT * FROM table1 INNER JOIN table2 ON table1.id = table2.id;

-- SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id;

-- SELECT * FROM table1 LEFT JOIN table2 USING (id);

-- SELECT * FROM table1 LEFT JOIN table2 ON table1.id = table2.id
--   LEFT JOIN table3 ON table2.id = table3.id;