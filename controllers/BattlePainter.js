function BattlePainter() {
    this.states = {
        "enemy": [
            [null,null,null],
            [null,null,null]
        ],
        "ally": [
            [null,null,null],
            [null,null,null]
        ]
    };
    this.damages = {
        "enemy": [
            [[],[],[]],
            [[],[],[]]
        ],
        "ally": [
            [[],[],[]],
            [[],[],[]]
        ]
    };
    this.background = null;
    this.shadow = null;
    this.digits = {};
}

BattlePainter.prototype.setEnemyState(row, column, state = "idle", frame = 0) {
    this.states["enemy"][row][column] = {
        state: state,
        frame: frame
    };
}

BattlePainter.prototype.setAllyState(row, column, state = "idle", frame = 0) {
    this.states["ally"][row][column] = {
        state: state,
        frame: frame
    };
}

BattlePainter.prototype.setEnemyDamage(row, column, damage, type = "normal") {
    this.states["ally"][row][column] = {
        state: state,
        frame: frame
    };
}