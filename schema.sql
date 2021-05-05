DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
    position INT NOT NULL,
    ame VARCHAR(30) NULL,
    PRIMARY KEY (position)
);

CREATE TABLE role(
    position INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (position)
);

CREATE TABLE employee(
    position INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (position)
);

SELECT * FROM employee_DB;
SELECT * FROM employee_DB.employee;
SELECT * FROM employee_DB.employeerole;
SELECT * FROM employee_DB.department