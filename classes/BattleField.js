function BattleField() {
    this.enemySide = [
        [null,null,null],
        [null,null,null]
    ];
    this.allySide = [
        [null,null,null],
        [null,null,null]
    ];
};

BattleField.prototype.isEnemy = function(id) {
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) if (this.enemySide[i][j] === id) return true;
    }
    return false;
};

BattleField.prototype.isAlly = function(id) {
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) if (this.allySide[i][j] === id) return true;
    }
    return false;
};

BattleField.prototype.getEnemyList = function() {
    var result = [];
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) if (this.enemySide[i][j]) result.push(this.enemySide[i][j]);
    }
    return result;
}

BattleField.prototype.getAllyList = function() {
    var result = [];
    for(var i=0;i<2;i++) {
        for(var j=0;j<3;j++) if (this.allySide[i][j]) result.push(this.allySide[i][j]);
    }
    return result;
}

module.exports = BattleField;