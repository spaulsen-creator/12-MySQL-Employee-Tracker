const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'employee_DB',
});

// connection.connect((err) => {
//     if (err) throw err;
//     start();
// });

const start = () => {
    inquirer
        .prompt({
            name: 'mainMenu',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View departments',
                'View roles',
                'View employee',
                'Add department',
                'Add role',
                'Add employee',
                'Update employee role',
                'Exit',
            ],
        })
        .then((answer) => {
            // if (answer.main === 'View departments') {
            //     departmentSearch();
            // } else if (answer.main === 'View roles') {
            //     rolesSearch();
            // } else if (answer.main === 'View employee') {
            //     employeeSearch();
            // } else if (answer.main === 'Add department ') {
            //     addDepartment();
            // } else if (answer.main === 'Add roles') {
            //     addRole();
            // } else if (answer.main === 'Add employee') {
            //     addEmployee();
            // } else if (answer.main === 'Update role') {
            //     editRole();
            // }
            switch (answer.mainMenu) {
                case 'View departments':
                    departmentSearch();
                    break;
                case 'View Roles':
                    rolesSearch();
                    break;
                case 'View Employee':
                    employeeSearch();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Add Roles':
                    addRole;
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Role':
                    editRole;
                    break;
                case 'Exit':
                    connection.end();
                    break;

            }
        });
};

const departmentSearch = () => {
    connection.query('SELECT * FROM department', (err, res) => {
        if (err) throw err;
        console.table('ALL department', res);
        start();
    });
};

const rolesSearch = () => {
    connection.query('SELECT * FROM role', (err, res) => {
        if (err) throw err;
        console.table('ALL role', res);
        start();
    });
};

const employeeSearch = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title,role.salary,department.department,manager_id FROM employee JOIN role ON employee.role_id=role.id JOIN department on department.id = role.department_id', (err, res) => {
        if (err) throw err;
        console.table('ALL employee', res);
        start();
    });
};

const addDepartment = () => {
    connection.query('SELECT * FROM department', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                name: 'department',
                type: 'input',
                message: 'Add a department',
            }, ]).then(function (answer) {
                connection.query(
                    'INSERT INTO department SET ?', {
                        name: answer.department,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('Department added');
                        start();
                    })
            })
    })

};


const addRole = () => {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: 'title',
                    type: 'input',
                    message: 'Add a role/title',
                },
                {
                    name: 'salary',
                    type: 'input',
                    message: 'Add a salary for this role/title',
                },
                {
                    name: 'department_id',
                    type: 'input',
                    message: 'Department id for this role/title',
                },
            ]).then(function (answer) {
                connection.query(
                    'INSERT INTO role SET ?', {
                        title: answer.title,
                        salary: answer.salary,
                        department_id: answer.department_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('New role/title added');
                        start();
                    })
            })
    })
};

const addEmployee = () => {
    connection.query('SELECT * FROM employee', function (err, res) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: 'first_name',
                    type: 'input',
                    message: 'Employee first name',
                },
                {
                    name: 'last_name',
                    type: 'input',
                    message: 'Employee last name',
                },
                {
                    name: 'manager_id',
                    type: 'input',
                    message: 'Employee manager id',
                },
                {
                    name: 'role',
                    type: 'list',
                    choices: function () {
                        var roleArray = [];
                        for (let i = 0; i < res.length; i++) {
                            roleArray.push(res[i].title);
                        }
                        return roleArray;
                    },

                    message: 'Employee role',
                },


            ]).then(function (answer) {
                let role_id;
                for (let a = 0; a < res.length; a++) {
                    if (res[a].title == answer.role) {
                        role_id = res[a].id;
                        console.log(role_id)
                    }
                }
                connection.query(
                    'INSERT INTO role SET ?', {
                        first_name: answer.first_name,
                        last_name: answer.last_name,
                        manager_id: answer.manager_id,
                        role_id: role_id,
                    },
                    function (err) {
                        if (err) throw err;
                        console.log('New employee added');
                        start();
                    })
            })
    })
};

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}\n`);
    start();
});