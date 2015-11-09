/* global Phaser, game, ms */

var Tile = function(col, row, type) {
    Phaser.Sprite.call(this, game, 0, 0, type);
    game.add.existing(this);
    this.tint = 0xdddddd;
    this.width = 160;
    this.height = 162;
    this.x = ms.map.X_OFFSET + col * 160 + 80 * (row % 2);
    this.y = ms.map.Y_OFFSET + row * 120;
    this.inputEnabled = true;
    this.input.pixelPerfectClick = true;

    this.events.onInputUp.add(function(pointer, target, unknown, row, col) {
        print(col, row);
        ms.map.tiles.forEach(function(column) {
            column.forEach(function(e) {
                e.tint = 0xdddddd;
            });
        });
        var adjacentTiles = this.getAdjacentTiles(col, row);
        adjacentTiles.forEach(function(e) {
            e.tint = 0xffffff;
        });
    }, this, 0, row, col);
};
Tile.prototype = Object.create(Phaser.Sprite.prototype);
Tile.prototype.constructor = Tile;
Tile.prototype.getAdjacentTiles = function(col, row) {
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

module.exports = Tile;