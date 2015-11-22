/* global Phaser, game, ms */

var TILE_SIZE = 140;

var Tile = function(col, row, type) {
    Phaser.Sprite.call(this, game, 0, 0, type);
    game.add.existing(this);
    this.anchor.set(0.5);
    this.tint = 0xffffff;
    this.width = this.height = TILE_SIZE;
    this.col = col;
    this.row = row;
    this.x = ms.map.X_OFFSET + col * this.width + (this.width / 2) * (row % 2) + this.width / 2;
    this.y = ms.map.Y_OFFSET + row * this.height * .74 + this.height / 2;
    if (game.rnd.frac() < .5) this.scale.x *= -1;

    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;
    this.events.onInputUp.add(function(sprite, pointer, isOver, row, col) {
        if (isOver === false) return;
        if (ms.markMode) {
            if (this.state == 'explored') return;
            ms.markMode = false;
            this.setMarked(!this.marked);
            return;
        }
        if (!this.reachable) return;
        if (this.marked) return;
        this.setExplored();
        ms.player.x = this.x;
        ms.player.y = this.y;
        // Resolve combat
        // Take resources
        var adjacentTiles = this.getAdjacentTiles();
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
    }, this, 0, row, col);

    this.reachable = false;
    this.state = 'explored';
    this.enemies = [];

    this.mark = game.add.image(this.x, this.y, 'crosshair');
    this.mark.anchor.set(0.5);
    this.mark.alpha = 0;
    this.mark.tint = 0xff0000;
    this.mark.width = this.mark.height = TILE_SIZE * .5;
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
    else if (row % 2 !== 0 && col < ms.map.WIDTH - 1) {
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
    this.setMarked(false);
};
Tile.prototype.setMarked = function(mark) {
    this.marked = mark;
    this.mark.alpha = this.marked ? 1 : 0;
};

module.exports = Tile;