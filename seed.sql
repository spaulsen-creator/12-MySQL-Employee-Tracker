USE employee_db;

INSERT INTO department (name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");



INSERT INTO role (title, salary, department_id)
VALUES 
    ("Sales Lead, 100000, 101"),
    ("Salesperson, 80000, 101"),
    ("Lead Engineer, 150000, 201"),
    ("Software engineer, 120000, 201"),
    ("Accountant, 125000, 301"),
    ("Legal Team Lead, 250000, 401"),
    ("Lawyer, 190000, 401");


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
    ("John, Doe, 12, 9"),
    ("Mike, Chan, 13, 10"),
    ("Ashley, Rodriguez, 14, null"),
    ("Kevin, Tupik, 15, 9"),
    ("Malia, Brown, 16, null"),
    ("Sarah, Lourd, 17, null"),
    ("Tom, Allen, 18, 11");


