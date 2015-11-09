/* global game, Phaser, ms */

var Player = function(targetTile) {
    Phaser.Sprite.call(this, game, 0, 0, 'pix');
    game.add.existing(this);
    ms.player = this;
    this.anchor.set(0.5);
    this.tint = 0x0000ff;
    this.height = 70;
    this.width = 40;
    this.x = targetTile.x;
    this.y = targetTile.y;

    if (targetTile.enemies.length > 0) targetTile.enemies.forEach(function(enemy) {
        enemy.kill();
        enemy.destroy();
    });
    targetTile.enemies = [];
    targetTile.setExplored();
    targetTile.getAdjacentTiles().forEach(function(tile) {
        tile.setRevealed();
    });
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;