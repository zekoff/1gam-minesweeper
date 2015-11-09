/* global game */
var GameMap = require('../Element/GameMap');

var Main = {};

var ROWS = 15;
var COLUMNS = 6;

var X_OFFSET = 20;
var Y_OFFSET = 20;

Main.create = function() {
    new GameMap();
};

module.exports = Main;