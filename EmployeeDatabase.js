var employeeList = require('./EmployeeList');

function EmployeeDatabase() {
    this.employeeList = employeeList;
}

EmployeeDatabase.prototype.contains = function(stringList, str) {
    for(var i=0;i<stringList.length;i++) {
        if (stringList[i].toLowerCase() === str.toLowerCase()) return true;
    }
    return false;
}

EmployeeDatabase.prototype.getEmployeeByCommonName = function(commonName) {
    commonName = commonName.trim().toLowerCase();
    for(var i=0;i<this.employeeList.length;i++) {
        if (this.contains(this.employeeList[i].commonNames, commonName)) {
            return this.employeeList[i];
        }
    }
    return null;
}

module.exports = new EmployeeDatabase();