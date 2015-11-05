/* global game */

var Main = {};

var ROWS = 15;
var COLUMNS = 6;

var X_OFFSET = 20;
var Y_OFFSET = 20;

Main.create = function() {
    var tiles = [];
    var row, col;
    for (col = 0; col < COLUMNS; col++) {
        tiles.push([]);
        for (row = 0; row < ROWS; row++) {
            var tile = game.add.image(0, 0, game.rnd.pick(['grass', 'trees', 'rocks']));
            tile.tint = 0xdddddd;
            tile.width = 160;
            tile.height = 162;
            tile.x = X_OFFSET + col * 160 + 80 * (row % 2);
            tile.y = Y_OFFSET + row * 120;
            tiles[col].push(tile);

            tile.inputEnabled = true;
            tile.events.onInputUp.add(function(pointer, target, unknown, row, col) {
                print(col, row);
                tiles.forEach(function(column) {
                    column.forEach(function(e) {
                        e.tint = 0xdddddd;
                    });
                });
                var adjacentTiles = [];
                adjacentTiles.push(tiles[col - 1][row]);
                adjacentTiles.push(tiles[col + 1][row]);
                if (row % 2 === 0) {
                    adjacentTiles.push(tiles[col - 1][row - 1]);
                    adjacentTiles.push(tiles[col][row - 1]);
                    adjacentTiles.push(tiles[col - 1][row + 1]);
                    adjacentTiles.push(tiles[col][row + 1]);
                }
                else {
                    adjacentTiles.push(tiles[col][row - 1]);
                    adjacentTiles.push(tiles[col + 1][row - 1]);
                    adjacentTiles.push(tiles[col][row + 1]);
                    adjacentTiles.push(tiles[col + 1][row + 1]);
                }
                adjacentTiles.forEach(function(e) {
                    e.tint = 0xffffff;
                });
            }, tile, 0, row, col);
        }
    }
};

module.exports = Main;