/* global game, Phaser, ms */

var Player = function(targetTile) {
    Phaser.Sprite.call(this, game, 0, 0, 'pix');
    game.add.existing(this);
    ms.player = this;
    this.anchor.set(0.5);
    this.tint = 0x0000ff;
    this.height = 70;
    this.width = 40;
    this.hp = 100;
    this.x = targetTile.x;
    this.y = targetTile.y;

    if (targetTile.enemies.length > 0) targetTile.destroyEnemies();
    targetTile.setExplored();
    targetTile.getAdjacentTiles().forEach(function(tile) {
        tile.setExplored();
        tile.destroyEnemies();
        tile.getAdjacentTiles().forEach(function(inner) {
            if (inner.state != 'explored') inner.setRevealed();
        });
    });
    targetTile.events.onInputUp.dispatch();
    this.currentTile = targetTile;
};
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;
Player.prototype.moveToTile = function(tile) {
    this.x = tile.x;
    this.y = tile.y;
    // TODO Incur tile effect
    tile.setExplored();
    // TODO Take resources
    var adjacentTiles = tile.getAdjacentTiles();
    adjacentTiles.forEach(function(e) {
        if (e.state === 'hidden')
            e.setRevealed();
    });
    var numSurroundingEnemies = adjacentTiles.map(function(tile) {
        return tile.enemies.length;
    }).reduce(function(prev, curr) {
        return prev + curr;
    });
    ms.hud.updateSurroundings(numSurroundingEnemies);
    this.currentTile = tile;
};
Player.prototype.damage = function(damage) {
    ms.hud.hpBar.width = 1040 * (this.hp / 100);
    this.hp -= damage;
};

module.exports = Player;