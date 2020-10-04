// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

// Employee plus
class Engineer extends Employee {
    constructor(name, id, email, github){
        fromEmp(name, id, email);
        // github
        this.github = github;
        // GitHub username
    };
    
    getGithub() {
        return this.github
    };
    getRole() {
        return 'Engineer'
    };
    // Overridden to return 'Engineer'
};

module.export = Engineer;