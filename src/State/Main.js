/* global ms, game */
var GameMap = require('../Logic/GameMap');
var Enemy = require('../Element/Enemy');
var Player = require('../Element/Player');
var Hud = require('../Element/Hud');

var Main = {};

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
    new Hud();
    new Player(game.rnd.pick(ms.map.tileArray));

    game.input.onUp.add(function() {
        game.scale.startFullScreen();
    });
    game.world.bringToTop(ms.hud.wrapper);
    ms.inputMask = game.add.image(0, 0, 'pix');
    ms.inputMask.width = 1080;
    ms.inputMask.height = 1920;
    ms.inputMask.alpha = 0;
};

module.exports = Main;