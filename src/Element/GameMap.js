/* global game, ms */
var Tile = require('./Tile');

var GameMap = function() {
    ms.map = this;
    this.tiles = [];
    var row, col;
    for (col = 0; col < this.WIDTH; col++) {
        this.tiles.push([]);
        for (row = 0; row < this.HEIGHT; row++) {
            var tile = new Tile(col, row, game.rnd.pick(['grass', 'trees', 'rocks']));
            this.tiles[col].push(tile);
        }
    }
};
GameMap.prototype = {};
GameMap.prototype.constructor = GameMap;
GameMap.prototype.WIDTH = 6;
GameMap.prototype.HEIGHT = 15;
GameMap.prototype.X_OFFSET = 20;
GameMap.prototype.Y_OFFSET = 20;

module.exports = GameMap;