/* global ms, game */
var GameMap = require('../Element/GameMap');
var Enemy = require('../Element/Enemy');
var Player = require('../Element/Player');
var Hud = require('../Element/Hud');

var Main = {};

var ROWS = 15;
var COLUMNS = 6;

var X_OFFSET = 20;
var Y_OFFSET = 20;

Main.create = function() {
    new GameMap();
    ms.map.tileArray.forEach(function(tile) {
        tile.setHidden();
    });
    ms.map.tileArray.forEach(function(tile) {
        if (game.rnd.frac() < .35) {
            new Enemy(tile);
        }
    });
    new Player(game.rnd.pick(ms.map.tileArray));
    new Hud();
};

module.exports = Main;