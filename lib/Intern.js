// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee')

// employee plus
class Intern extends Employee {
    constructor(name, id, email, school){
        fromEmp(name, id, email);
        // school 
        this.school = school;
    }
    getSchool() {
        return this.school
    };
    getRole() {
        // Overridden to return 'Intern'
        return 'Intern'
    };
};

module.exports = Intern;