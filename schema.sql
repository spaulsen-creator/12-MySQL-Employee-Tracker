DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
    id INT NOT NULL,
    name VARCHAR(30) NULL,
    PRIMARY KEY (id)
);



CREATE TABLE role(
    id INT NOT NULL,
    title VARCHAR(30) NULL,
    salary DECIMAL(7,2) NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE CASCADE
	
);

CREATE TABLE employee(
    id INT NOT NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    role_id INT NOT NULL,
    manager_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE CASCADE
	-- FOREIGN KEY (manager_id)
--         REFERENCES manager(id)
--         ON DELETE CASCADE
    
);
SELECT * FROM employee_DB;
SELECT * FROM employee_DB.employee;
SELECT * FROM employee_DB.employeerole;
SELECT * FROM employee_DB.department

