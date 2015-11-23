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
    this.tileArray = [];
    this.tiles.forEach(function(arr) {
        arr.forEach(function(tile) {
            this.tileArray.push(tile);
        }, this);
    }, this);
};
GameMap.prototype = {};
GameMap.prototype.constructor = GameMap;
GameMap.prototype.WIDTH = 7;
GameMap.prototype.HEIGHT = 14;
GameMap.prototype.X_OFFSET = 15;
GameMap.prototype.Y_OFFSET = 20;

module.exports = GameMap;