/* global Phaser, game, ms */

var Enemy = function(targetTile) {
    Phaser.Sprite.call(this, game, 0, 0, 'skeleton');
    game.add.existing(this);
    this.smoothed = false;
    this.anchor.set(0.5);
    this.height = 100;
    this.width = 100;
    this.hp = 100;
    this.x = targetTile.x;
    this.y = targetTile.y;
    targetTile.enemies.push(this);
    this.setHidden();
};
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.setHidden = function() {
    this.alpha = 0;
};
Enemy.prototype.setRevealed = function() {
    this.alpha = 1;
};
Enemy.prototype.getAction = function() {
    var damage = game.rnd.between(10, 20);
    return {
        text: "The enemy does " + damage + " points of damage.",
        action: ms.player.adjustHp.bind(ms.player, -damage)
    };
};
Enemy.prototype.damage = function(damage) {
    this.hp -= damage;
};

module.exports = Enemy;