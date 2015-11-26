/* global ms, game */

var Battle = function(tile) {
    ms.battle = this;
    this.battleTile = tile;
    this.enemies = tile.enemies;
    this.targetedEnemy = tile.enemies[0];
};
Battle.prototype = {};
Battle.prototype.constructor = Battle;
Battle.prototype.begin = function() {
    ms.hud.startBattleMode();
};
Battle.prototype.victory = function() {
    // TODO display battle results
    this.battleTile.destroyEnemies();
    ms.hud.endBattleMode();
    ms.player.moveToTile(this.battleTile);
    ms.battle = null;
};
Battle.prototype.defeat = function() {
    print('you lose...');
};
Battle.prototype.playerAction = function(action) {
    ms.inputMask.inputEnabled = true;
    var playerText, playerFunction;
    // switch based on action taken
    switch (action) {
        case 'blast':
            break;
        case 'leech':
            break;
        case 'shield':
            break;
        default:
            var damage = game.rnd.between(10, 20);
            playerText = "You blast the enemy for " + damage + " damage!";
            playerFunction = this.targetedEnemy.damage.bind(this.targetedEnemy, damage);
            break;
    }
    // TODO show animation
    ms.hud.addText(playerText);
    playerFunction();
    if (this.targetedEnemy.hp <= 0) {
        ms.inputMask.inputEnabled = false;
        this.victory();
    }
    // TODO wait until player animation complete
    this.enemies.forEach(function(enemy) {
        // TODO queue after previous animation complete
        var enemyAction = enemy.getAction();
        // TODO show animation
        print(enemyAction.text);
        ms.hud.addText(enemyAction.text);
        print(enemyAction.action);
        enemyAction.action();
        // resolve action (if loss condition, unmask input)
        if (ms.player.hp <= 0) {
            ms.inputMask.inputEnabled = false;
            this.defeat();
        }
    }, this);
    ms.inputMask.inputEnabled = false;
};

module.exports = Battle;