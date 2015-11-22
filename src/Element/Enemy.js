/* global Phaser, game */

var Enemy = function(targetTile) {
    Phaser.Sprite.call(this, game, 0, 0, 'pix');
    game.add.existing(this);
    this.anchor.set(0.5);
    this.tint = 0xff0000;
    this.height = 60;
    this.width = 60;
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

module.exports = Enemy;