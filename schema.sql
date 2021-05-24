DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL (10,2) NOT NULL,
    department_id INT  NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id) 
);

create table employee 
( 
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
    CONSTRAINT tb_fk  foreign key (manager_id) references employee (id) on delete cascade,
	CONSTRAINT tb_fkk  foreign key (role_id) references role (id) on delete cascade 
);

USE employee_db;
INSERT INTO department (department)
VALUES ('Sales'), ('Engineering'), ('Finance'), ('Legal');

INSERT INTO role (title,salary,department_id)
VALUES 
('Sales Lead', 95000, 1),  
('Salesperson', 65000, 1), 
('Lead Engineer', 150000, 2),
('Software Eningeer', 120000, 2),
('FullStack Developer', 100000, 2), 
('Finance Manager', 130000, 3),
('Finance Lead', 100000, 3),
('Accountant', 90000, 3),
('Chief Legal Lawyer', 200000, 4),
('Lawyer', 120000, 4),
('Legal Team', 80000, 4),


