/* global game, Phaser, ms */

var Player = function(targetTile) {
    Phaser.Sprite.call(this, game, 0, 0, 'human');
    game.add.existing(this);
    ms.player = this;
    this.smoothed = false;
    this.anchor.set(0.5);
    this.height = 100;
    this.width = 100;
    this.maxHp = this.hp = 100;
    this.maxMp = this.mp = 5;
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
    if (tile.destroyed) this.adjustHp(-15);
    if (tile.resources) {
        this.adjustHp(tile.resources.hp);
        this.adjustMp(tile.resources.mp);
    }
    tile.setExplored();
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
Player.prototype.adjustHp = function(amount) {
    if (!amount) return;
    this.hp += amount;
    if (this.hp > this.maxHp) this.hp = this.maxHp;
    this.updateBars();
    // TODO if HP < 0, trigger a loss
};
Player.prototype.adjustMp = function(amount) {
    if (!amount) return;
    this.mp += amount;
    if (this.mp > this.maxMp) this.mp = this.maxMp;
    if (this.mp < 0) this.mp = 0;
    this.updateBars();
};
Player.prototype.updateBars = function() {
    ms.hud.hpBar.width = 1040 * (this.hp / this.maxHp);
    ms.hud.mpBar.width = 1040 * (this.mp / this.maxMp);
};

module.exports = Player;