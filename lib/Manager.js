// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee')

// Employee plus
class Manager extends Employee {
    constructor(name, id, email, officeNumber){
        fromEmp(name, id, email);    
        // officeNumber
        this.officeNumber = officeNumber;
    };
    getOfficeNumber() {
        return this.officeNumber
    };
    getRole() {
        return 'Manager'
    };
    // Overridden to return 'Manager'
};

module.exports = Manager;