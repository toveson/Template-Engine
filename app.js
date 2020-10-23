const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

let employee = [];

// Questions for all employee types
function blanketQuestions(position) {
    return [
        {
            type: 'input',
            name: 'name',
            message: 'What is the name of the employee?',
        },
        {
            type: 'input',
            name: 'ID',
            message: 'What is their ID?'
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is their email address?'
        }
    ]
};

// Questions for specific employee type
const positionQuestions = {
    manager: {
        type: 'number',
        name: 'officeNumber',
        message: 'Enter the managers office phone number',
    },
    engineer: {
        type: 'input',
        name: 'github',
        message: 'Enter their github profile name'
    },
    intern: {
        type: 'input',
        name: 'school',
        message: 'Enter their school'
    }
};

// confirming if the user wants to add more employees or not
const addMore = {
    type: 'confirm',
    name: 'addMore',
    message: 'Do you need to add additional employees?'
};

// starts the process of entering employees
function start() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'begin',
            message: 'Please add the managers information'
        }
    ]).then(function (data) {
        manager()
    })
};

// function to gather manager info
function manager() {
    let manage = blanketQuestions('manager');
    manage.push(positionQuestions.manager, addMore);
    
    inquirer.prompt(manage).then(function (data) {
        const manager = new Manager(data.name, data.ID, data.email, data.officeNumber);
        employee.push(manager);
        if (!data.addMore) {
            return renderer()
        };
        employeeType();
    });
};

// function to determin what type of employee the user wants to add
function employeeType(position) {
    inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Select the type of employee you would like to add:',
            choices: ['Engineer', 'Intern']
        }
    ]).then(data => {
        if (data.type === 'Engineer') {
            enginner();
        } else if (data.type === 'Intern') {
            intern();
        };
    });
};

// function to gather engineer info
function enginner() {
    let newEngineer = blanketQuestions('enginner');
    newEngineer.push(positionQuestions.engineer, addMore);

    inquirer.prompt(newEngineer).then(function (data) {
        const enginner = new Engineer(data.name, data.ID, data.email, data.github);
        employee.push(enginner);
        if (!data.addMore) {
            return renderer()
        };
        employeeType();
    });
};

// function to gather intern info
function intern() {
    let newEngineer = blanketQuestions('intern');
    newEngineer.push(positionQuestions.engineer, addMore);

    inquirer.prompt(newEngineer).then(function (data) {
        const intern = new Intern(data.name, data.ID, data.email, data.github);
        employee.push(intern);
        if (!data.addMore) {
            return renderer()
        };
        employeeType();
    });
};

// function to creat the html file from user input
function renderer() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    };
    fs.writeFile(outputPath, render(employee), err => {
        if (err) {
            throw err;
        };
        console.log("Your file has been created!");
    });
};

// Start the app!!!
start();