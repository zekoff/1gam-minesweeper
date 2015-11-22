/* global Phaser, game, ms */

var Hud = function() {
    Phaser.Group.call(this, game);
    ms.hud = this;
    this.surroundingEnemies = game.add.text(540, 1850, "", {
        fontSize: 80,
        fill: 'white'
    });
    this.surroundingEnemies.anchor.set(0.5);
    this.add(this.surroundingEnemies);

    this.markButton = game.add.text(360, 1700, "MARK", {
        fontSize: 100,
        fill: 'red'
    });
    this.markButton.anchor.set(0.5);
    this.markButton.inputEnabled = true;
    this.markButton.events.onInputUp.add(function() {
        ms.markMode = true;
    });
    this.add(this.markButton);

    this.launchButton = game.add.text(720, 1700, "FIRE", {
        fontSize: 100,
        fill: 'red'
    });
    this.launchButton.anchor.set(0.5);
    this.launchButton.events.onInputUp.add(function() {});
    this.add(this.launchButton);
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.updateSurroundings = function(number) {
    this.surroundingEnemies.setText("Surrounded by: " + number);
};

module.exports = Hud;