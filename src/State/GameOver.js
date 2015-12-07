/* global game */

var GameOver = {};

GameOver.init = function(text) {
    this.text = text;
};

GameOver.create = function() {
    // TODO add background
    var text = game.add.text(540, 600, this.text, {
        fontSize: 80,
        fill: 'white'
    });
    text.anchor.set(0.5);
    game.time.events.add(2000, function() {
        game.input.onUp.addOnce(function() {
            game.state.start('Title');
        });
    });
};

module.exports = GameOver;