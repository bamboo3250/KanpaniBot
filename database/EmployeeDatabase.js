var employeeList = require('./EmployeeList');

function EmployeeDatabase() {
    this.employeeList = employeeList;
}

EmployeeDatabase.prototype.contains = function(stringList, str) {
    for(var i=0;i<stringList.length;i++) {
        if (stringList[i].trim().toLowerCase() === str.trim().toLowerCase()) return true;
    }
    return false;
}

EmployeeDatabase.prototype.isEx = function(employeeId) {
    return parseInt(employeeId.substring(4,5)) == 9;
}

EmployeeDatabase.prototype.getEmployeeByCommonName = function(commonName) {
    commonName = commonName.trim().toLowerCase();
    for(var i=0;i<this.employeeList.length;i++) {
        if (this.contains(this.employeeList[i].commonNames, commonName)) {
            return this.employeeList[i];
        }
        if (this.contains([this.employeeList[i]._no], commonName)) {
            return this.employeeList[i];
        }
    }
    return null;
}

EmployeeDatabase.prototype.getEmployeeById = function(employeeId) {
    for(var i=0;i<this.employeeList.length;i++) {
        if (this.employeeList[i]._id === employeeId) {
            return this.employeeList[i];
        }
    }
    return null;
}

EmployeeDatabase.prototype.getEmployeesByRarirty = function(rarity) {
    var result = [];
    for(var i=0;i<this.employeeList.length;i++) {
        if (parseInt(this.employeeList[i]._id.substring(3,4)) === rarity) {
            result.push(this.employeeList[i]);
        }
    }
    return result;
}


function getMinimumEditDistance(name1, name2) {
    name1 = name1.trim().toLowerCase();
    name2 = name2.trim().toLowerCase();
    if (name2.startsWith(name1)) return 0;
    if (name2.endsWith(name1)) return 0;
    name1 = "#" + name1;
    name2 = "#" + name2;

    var distance = [];
    for(var i=0;i<name1.length;i++) {
        distance.push([]);
        for(var j=0;j<name2.length;j++) distance[i].push(1000000000);
    }
    for(var i=0;i<name1.length;i++) distance[i][0] = i;
    for(var i=0;i<name2.length;i++) distance[0][i] = i;
    for(var i=1;i<name1.length;i++) {
        for(var j=1;j<name2.length;j++) {
            if (name1[i] === name2[j]) {
                distance[i][j] = Math.min(distance[i][j], distance[i-1][j-1]);
            } else {
                distance[i][j] = Math.min(distance[i][j], distance[i-1][j-1]+2);
            }
            distance[i][j] = Math.min(distance[i][j], distance[i-1][j]+1);
            distance[i][j] = Math.min(distance[i][j], distance[i][j-1]+1);
        }
    }
    return distance[name1.length-1][name2.length-1];
}

EmployeeDatabase.prototype.getSuggestionsByName = function(commonName) {
    commonName = commonName.trim().toLowerCase();
    var nameList = [];
    for(var i=0;i<this.employeeList.length;i++) {
        if (this.employeeList[i].fullName === "") continue;

        for(var j=0;j<this.employeeList[i].commonNames.length;j++) {
            nameList.push({
                name: this.employeeList[i].commonNames[0],
                score: getMinimumEditDistance(commonName, this.employeeList[i].commonNames[j])
            });    
        }
        nameList.push({
            name: this.employeeList[i].commonNames[0],
            score: getMinimumEditDistance(commonName, this.employeeList[i].fullName)
        });
        nameList.push({
            name: this.employeeList[i].commonNames[0],
            score: getMinimumEditDistance(commonName, this.employeeList[i].japaneseName)
        });
        nameList.push({
            name: this.employeeList[i].commonNames[0],
            score: getMinimumEditDistance(commonName, this.employeeList[i]._no)
        });
    }
    nameList.sort(function(a,b) {
        if (a.score != b.score) {
            return a.score - b.score;    
        } else {
            return a.name < b.name;
        }
    });
    var resultDict = {};
    resultDict[nameList[0].name] = true;
    for(var i=1;i<nameList.length;i++) {
        if (nameList[i].score == nameList[i-1].score) {
            resultDict[nameList[i].name] = true;
        } else break;
    }
    var resultList = [];
    for(key in resultDict) resultList.push(key);
    return resultList;
}

EmployeeDatabase.prototype.getSuggestionsByClass = function(classId) {
    var resultList = [];
    for(var i=0;i<this.employeeList.length;i++) {
        var employeeId = this.employeeList[i]._id;
        if (parseInt(employeeId.substring(2,3)) == classId) {
            resultList.push(this.employeeList[i].commonNames[0]);
        }
    }
    return resultList;
}

module.exports = new EmployeeDatabase();