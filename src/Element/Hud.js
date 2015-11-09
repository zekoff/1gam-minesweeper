/* global Phaser, game, ms */

var Hud = function() {
    Phaser.Group.call(this, game);
    ms.hud = this;
    this.surroundingEnemies = game.add.text(540, 1800, "", {
        fontSize: 100,
        fill: 'white'
    });
    this.surroundingEnemies.anchor.set(0.5);
    this.add(this.surroundingEnemies);
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.updateSurroundings = function(number) {
    this.surroundingEnemies.setText("Surrounded by: " + number);
};

module.exports = Hud;