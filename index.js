const fs = require("fs");

const generateHTML = require("./src/generateHTML");

const inquirer = require("inquirer");

const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");

const Intern = require("./lib/Intern");


const teamMembers = [];

const questionsManager = [{
        type: "input",
        name: "name",
        message: "What is the team manager's name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
    },
    {
        type: "list",
        name: "members",
        message: "Select the role of any team member to be added to the directory.",
        choices: ["Engineer", "Intern", "No more team members to add."],
    },
];

const askEngineer = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "What is the engineer's name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your engineer id?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "gitHub",
                message: "What is your GitHub username?",
            },
            {
                type: "list",
                name: "members",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "No more team members to add."],
            },
        ])
        .then((data) => {
            var engineer = new Engineer(data.name, data.id, data.email, data.gitHub)
            teamMembers.push(
                engineer
            );
            if (data.members === "Engineer") {
                askEngineer();
            } else if (data.members === "Intern") {
                askIntern();
            } else {
                let data = generateHTML(teamMembers);
                fs.writeFileSync("team.html", data, "utf-8");
            }
        });
};

const askIntern = () => {
    inquirer
        .prompt([{
                type: "input",
                name: "name",
                message: "What is your name?",
            },
            {
                type: "input",
                name: "id",
                message: "What is your intern id?",
            },
            {
                type: "input",
                name: "email",
                message: "What is your email?",
            },
            {
                type: "input",
                name: "school",
                message: "What is your school?",
            },
            {
                type: "list",
                name: "members",
                message: "Which type of team member would you like to add?",
                choices: ["Engineer", "Intern", "No more team members to add."],
            },
        ]).then((data) => {
            teamMembers.push(
                new Intern(data.name, data.id, data.email, data.school)
            );
            if (data.members === "Engineer") {
                askEngineer();
            } else if (data.members === "Intern") {
                askIntern();
            } else {
                let data = generateHTML(teamMembers);
                fs.writeFileSync("team.html", data, "utf-8");
            }
        });
};

const init = () => {
    inquirer.prompt(questionsManager).then((data) => {
        teamMembers.push(
            new Manager(data.name, data.id, data.email, data.officeNumber)
        );
        if (data.members === "Engineer") {
            askEngineer();
        } else if (data.members === "Intern") {
            askIntern();
        } else {
            let data = generateHTML(teamMembers);
            fs.writeFileSync("team.html", data, "utf-8");
        }
    });
};


init();