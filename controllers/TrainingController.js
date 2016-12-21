function TrainingController(bot) {
    this.type = "training";
    this.bot = bot;
    this.sideA = [[null,null,null],[null,null,null]];
    this.sideB = [[null,null,null],[null,null,null]];

}

function attackByPhaseRecursively(skill, attacker, target, iter, result, callback) {
    if (iter == skill.phases.length) {

        return;
    }

} 

TrainingController.prototype.attack = function(attacker, target, callback) {
    var skillName = attacker.getCurrentSkill();
    if (!skillName) {
        callback(null, "You need to equip weapon first.", null);
        return;
    }
    var skill = bot.skillDatabase.getSkill(skillName);  // TODO
    if (!skill.canAttack) {
        callback(null, "You cannot use **" + skillName + "** to attack.", null);
        return;
    }


    // var result = [];
    // attackByPhaseRecursively(skill, attacker, target, 0, result, function() {
        
    // });


    callback(null, text, )
}

module.exports = new TrainingController();