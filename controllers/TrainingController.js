function TrainingController(bot) {
    this.bot = bot;
}

function attackByPhaseRecursively(skill, attacker, target, iter, result, callback) {
    if (iter == skill.phases.length) {

        return;
    }

} 

TrainingController.prototype.attack = function(skill, attacker, target, callback) {
    var result = [];
    attackByPhaseRecursively(skill, attacker, target, 0, result, function() {
        
    });
}

module.exports = new TrainingController();