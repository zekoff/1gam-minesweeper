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
    var target = this.targetedEnemy;
    // switch based on action taken
    switch (action) {
        case 'blast':
            if (ms.player.mp >= 1) {
                playerText = "You blast the target with plasma for 50 damage!";
                playerFunction = function() {
                    target.damage(70);
                    ms.player.adjustMp(-1);
                };
            }
            else
                playerText = "You activate your plasma blaster, but don't have enough energy..."
            break;
        case 'leech':
            playerText = "You leech energy from the target to restore your plasma reserves.";
            playerFunction = function() {
                target.damage(10);
                ms.player.adjustMp(5);
            };
            break;
        case 'shield':
            if (ms.player.mp > 2) {
                playerText = "You wrap yourself in a plasma shield, nullifying damage this turn.";
                playerFunction = function() {
                    ms.player.adjustMp(-2);
                    ms.player.adjustHp(30);
                };
            }
            else playerText = "You turn on your shield generator, but don't have enough energy...";
            break;
        default:
            var damage = game.rnd.between(10, 20);
            playerText = "You blast the enemy for " + damage + " damage!";
            playerFunction = this.targetedEnemy.damage.bind(this.targetedEnemy, damage);
            break;
    }
    // TODO show animation
    ms.hud.addText(playerText);
    if (playerFunction) playerFunction();
    if (this.targetedEnemy.hp <= 0) {
        ms.inputMask.inputEnabled = false;
        this.victory();
        return;
    }
    // TODO wait until player animation complete
    for (var i = 0; i < this.enemies.length; i++) {
        // TODO queue after previous animation complete
        var enemyAction = this.enemies[i].getAction();
        // TODO show animation
        ms.hud.addText(enemyAction.text);
        enemyAction.action();
        // resolve action (if loss condition, unmask input)
        if (ms.player.hp <= 0) {
            ms.inputMask.inputEnabled = false;
            this.defeat();
            break;
        }
    }
    ms.inputMask.inputEnabled = false;
};

module.exports = Battle;