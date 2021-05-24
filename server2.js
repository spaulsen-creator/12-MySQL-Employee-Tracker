const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,

});

const start = () => {
    inquirer
        .prompt({
            name: 'mainMenu',
            type: 'list',
            message: 'What would you like to do? ',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Remove Employee',
                'Update Employee',
                'Add a Department',
                'Remove a Department',
                'Add a Role',
                'Remove a Role',
                'Exit'
            ]
        }).then((answer) => {
            switch (answer.mainMenu) {
                case 'View All Employees':
                    employeeSearch();
                    break;

                case 'View All Departments':
                    departmentSearch();
                    break;

                case 'View All Roles':
                    rolesSearch();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee':
                    updateEmployee();
                    break;

                case 'Add a Department':
                    addDepartment();
                    break;

                case 'Remove a Department':
                    removeDepartment();
                    break;

                case 'Add a Role':
                    addRole();
                    break;

                case 'Remove a Role':
                    removeRole();
                    break;

                default:
                    connection.end()
                    console.log("ALL done have a nice day!!")
            }
        });
}

const employeeSearch = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title,role.salary,department.department,manager_id FROM employee JOIN role ON employee.role_id=role.id JOIN department on department.id = role.department_id',
        (err, searched) => {
            if (err) throw err;
            console.table(searched)
            start();
        });

}
/// connection.querey for all departments apend departments into an array 
const departmentSearch = () => {
    connection.query('SELECT * FROM department',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            empPerDepart()
        })

}
const empPerDepart = () => {
    inquirer.prompt([
        {
            name: 'employeeDepart',
            type: 'input',
            message: 'In what Department Would you like to view employees, Enter Department ID?'
        },
    ]).then((res) =>
        connection.query(`SELECT * FROM employee JOIN role ON employee.role_id=role.id JOIN department on department.id = role.department_id WHERE department_id = ${res.employeeDepart}`,
            (err, searched) => {
                if (err) throw err;
                console.table(searched)
                start();
            })
    )
}


const rolesSearch = () => {
    connection.query('SELECT * FROM role',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            start()
        })
}

const addEmployee = () => {
    connection.query('SELECT * FROM role',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            addEmpRole()
        })
}
const addEmpRole = ()=> {
    inquirer.prompt([
        {
            name: 'firstName',
            type: 'input',
            message: 'What is the Employees First Name?'
        },
        {
            name: 'lastName',
            type: 'input',
            message: 'What is the Employees Last Name?'
        },
        {
            name: 'role_id',
            type: 'input',
            message: 'What is the Employees Role id?'
        }])
        .then((res) => {
            const query = "INSERT INTO employee SET ?"
            connection.query(query,
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: res.role_id

                }, (err) => {
                    if (err) throw err;
                })
            start();
        }
        );
}

const removeEmployee = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title,role.salary,department.department,manager_id FROM employee JOIN role ON employee.role_id=role.id JOIN department on department.id = role.department_id',
        (err, searched) => {
            if (err) throw err;
            console.table(searched)
            removeEmpID();
        });
}

const removeEmpID = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What Employee would you like to remove, Enter Employee Id?'
        },
    ]).then((res) => {
        console.log('Removing employee from DataBase\n');
        connection.query(
            'DELETE FROM employee WHERE ?',
            {
                id: res.id,
            },
            (err, res) => {
                if (err) throw err;
                start();
            }
        );
    });
}
const updateEmployee = () => {
    connection.query('SELECT employee.id, employee.first_name, employee.last_name, role.title,role.salary,department.department,role_id FROM employee JOIN role ON employee.role_id=role.id JOIN department on department.id = role.department_id',
    (err, searched) => {
        if (err) throw err;
        console.table(searched)
        updateEmpRole();
    });

}
const updateEmpRole =() =>{
    inquirer.prompt([
        {
            name: 'employeeId',
            type: 'input',
            message: 'What  Employee would you like to update, Enter the Employees ID?'
        },
        {
            name: 'newRole',
            type: 'input',
            message: 'What is the new Role you would you like to give this Employee, Enter the new Role ID?'
        }
    ]).then((res) => {
        console.log ("updating employee role")
        connection.query(
            `UPDATE employee SET role_id = ${res.newRole} WHERE id =${res.employeeId}`,
            (err) => {
                if (err) throw err
                start();
            })
    })
}


const addDepartment = () => {
    inquirer.prompt([
        {
            name: 'departName',
            type: 'input',
            message: 'What is the name of this New Department?'
        }
    ])
        .then((res) => {
            const query = "INSERT INTO department SET ?"
            connection.query(query,
                {
                    department: res.departName,
                }, (err) => {
                    if (err) throw err;
                })
            start();
        }
        );
}

const removeDepartment = () => {
    connection.query('SELECT * FROM department',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            removeDEPID()
        })
}

const removeDEPID = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What Department would you like to remove, Enter Department Id?'
        },
    ]).then((res) => {
        console.log('Removing Department from DataBase\n');
        connection.query(
            'DELETE FROM department WHERE ?',
            {
                id: res.id,
            },
            (err, res) => {
                if (err) throw err;
                start();
            }
        );
    });
}

const addRole = () => {
    connection.query('SELECT * FROM role',
    function (err, res) {
        if (err) throw err;
        console.table(res);
        addNewRole()
    })
}
const addNewRole =()=>{
    inquirer.prompt([
        {
            name: 'roleTitle',
            type: 'input',
            message: 'What is this Roles Title?'
        },
        {
            name: 'roleSalary',
            type: 'input',
            message: 'What is the Roles Salary?'
        },
        {
            name: 'department_id',
            type: 'input',
            message: 'What is the Roles Department Id?'
        }])
        .then((res) => {
            console.log("Adding Role!")
            const query = "INSERT INTO role SET ?"
            connection.query(query,
                {
                    title: res.roleTitle,
                    salary: res.roleSalary,
                    department_id: res.department_id

                }, (err) => {
                    if (err) throw err;
                    start()
                })
        }
        );
}

const removeRole = () => {
    connection.query('SELECT * FROM role',
        function (err, res) {
            if (err) throw err;
            console.table(res);
            removeRoleID()
        })
}


const removeRoleID = () => {
    inquirer.prompt([
        {
            name: 'id',
            type: 'input',
            message: 'What Role would you like to remove, Enter Role Id?'
        },
    ]).then((res) => {
        console.log('Removing Role from DataBase\n');
        connection.query(
            'DELETE FROM role WHERE ?',
            {
                id: res.id,
            },
            (err, res) => {
                if (err) throw err;
                start();
            }
        );
    });
}


start()

// https://git.heroku.com/intense-forest-25776.git