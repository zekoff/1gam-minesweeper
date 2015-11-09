/* global Phaser, game, ms */

var Tile = function(col, row, type) {
    Phaser.Sprite.call(this, game, 0, 0, type);
    game.add.existing(this);
    this.anchor.set(0.5);
    this.tint = 0xffffff;
    this.width = 160;
    this.height = 160;
    this.col = col;
    this.row = row;
    this.x = ms.map.X_OFFSET + col * this.width + (this.width / 2) * (row % 2) + this.width / 2;
    this.y = ms.map.Y_OFFSET + row * this.height * .74 + this.height / 2;

    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputUp.add(function(pointer, target, unknown, row, col) {
        if (!this.reachable) return;
        this.setExplored();
        ms.player.x = this.x;
        ms.player.y = this.y;
        var adjacentTiles = this.getAdjacentTiles();
        adjacentTiles.forEach(function(e) {
            if (e.state === 'hidden')
                e.setRevealed();
        });
        var surroundingEnemies = adjacentTiles.map(function(tile) {
            return tile.enemies.length;
        }).reduce(function(prev, curr) {
            return prev + curr;
        });
        ms.hud.updateSurroundings(surroundingEnemies);
    }, this, 0, row, col);

    this.reachable = false;
    this.state = 'explored';
    this.enemies = [];
};
Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.getAdjacentTiles = function() {
    var col = this.col;
    var row = this.row;
    var adjacentTiles = [];
    if (col > 0)
        adjacentTiles.push(ms.map.tiles[col - 1][row]);
    if (col < ms.map.WIDTH - 1)
        adjacentTiles.push(ms.map.tiles[col + 1][row]);
    adjacentTiles.push(ms.map.tiles[col][row - 1]);
    adjacentTiles.push(ms.map.tiles[col][row + 1]);

    if (row % 2 === 0 && col > 0) {
        adjacentTiles.push(ms.map.tiles[col - 1][row - 1]);
        adjacentTiles.push(ms.map.tiles[col - 1][row + 1]);
    }
    else if (col < ms.map.WIDTH - 1) {
        adjacentTiles.push(ms.map.tiles[col + 1][row - 1]);
        adjacentTiles.push(ms.map.tiles[col + 1][row + 1]);
    }
    return adjacentTiles.filter(function(e) {
        return typeof e !== 'undefined';
    });
};
Tile.prototype.setHidden = function() {
    this.state = 'hidden';
    this.tint = 0x000000;
    this.enemies.forEach(function(enemy) {
        enemy.setHidden();
    });
};
Tile.prototype.setRevealed = function() {
    this.state = 'revealed';
    this.tint = 0x808080;
    this.enemies.forEach(function(enemy) {
        enemy.setHidden();
    });
    this.reachable = true;
};
Tile.prototype.setExplored = function() {
    this.state = 'explored';
    this.tint = 0xffffff;
    this.enemies.forEach(function(enemy) {
        enemy.setRevealed();
    });
    this.reachable = true;
};

module.exports = Tile;