/* global game */

var Title = {};

Title.create = function() {
    game.input.onUp.add(function() {
        game.scale.startFullScreen();
    });
    game.add.image(0, 0, 'title_image');
    game.time.events.add(2000, function() {
        var text = game.add.text(540, 1600, "Touch/Click to Start", {
            fontSize: 60,
            fill: 'white'
        });
        text.anchor.set(0.5);
        game.input.onUp.addOnce(function() {
            game.state.start('Main');
        });
    });
};

module.exports = Title;