/* global game */

var Title = {};

Title.create = function() {
    game.input.onUp.add(function() {
        game.scale.startFullScreen();
    });

    game.state.start('Main');
};

module.exports = Title;