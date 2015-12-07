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
    var playerText, playerFunction, damage;
    var target = this.targetedEnemy;
    switch (action) {
        case 'blast':
            if (ms.player.mp >= 1) {
                damage = game.rnd.between(15, 25);
                playerText = "You attack the enemy with your flame sword for " + damage + " damage!";
                playerFunction = function() {
                    target.damage(damage);
                    ms.player.adjustMp(-1);
                };
            }
            else
                playerText = "You try to activate your flame sword, but don't have enough MP...";
            break;
        case 'leech':
            damage = game.rnd.between(3, 7);
            playerText = "You leech energy from the target, doing " + damage + " damage and restoring your MP.";
            playerFunction = function() {
                target.damage(damage);
                ms.player.adjustMp(5);
            };
            break;
        case 'shield':
            if (ms.player.mp >= 2) {
                damage = game.rnd.between(20, 40);
                playerText = "You cast your healing spell, healing " + damage + " damage.";
                playerFunction = function() {
                    ms.player.adjustMp(-2);
                    ms.player.adjustHp(damage);
                };
            }
            else playerText = "You try to cast a heal, but don't have enough MP...";
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