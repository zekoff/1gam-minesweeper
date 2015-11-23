/* global Phaser, game, ms */

var Hud = function() {
    this.wrapper = game.add.group();
    this.wrapper.fixedToCamera = true;
    Phaser.Group.call(this, game);
    ms.hud = this;
    this.inputMask = game.add.image(0, 0, 'pix');
    this.inputMask.width = 1080;
    this.inputMask.height = 1920;
    this.inputMask.alpha = 0;
    this.wrapper.add(this.inputMask);
    this.wrapper.add(this);

    this.surroundingEnemies = game.add.text(540, 50, "", {
        fontSize: 80,
        fill: 'white'
    });
    this.surroundingEnemies.anchor.set(0.5);
    this.add(this.surroundingEnemies);

    this.markButton = game.add.text(360, 1600, "MARK", {
        fontSize: 100,
        fill: 'red'
    });
    this.markButton.anchor.set(0.5);
    this.markButton.inputEnabled = true;
    this.markButton.events.onInputUp.add(function() {
        ms.markMode = true;
    });
    this.add(this.markButton);

    this.launchButton = game.add.text(720, 1600, "FIRE", {
        fontSize: 100,
        fill: 'red'
    });
    this.launchButton.anchor.set(0.5);
    this.launchButton.inputEnabled = true;
    this.launchButton.events.onInputUp.add(function() {
        print('firing');
        ms.map.tileArray.forEach(function(tile) {
            if (tile.marked) {
                tile.setMarked(false);
                tile.revealEnemies();
                // TODO damage enemies
            }
            else {
                // TODO damage tile, remove resources, etc.
            }
            tile.marked = false;
        });
    });
    this.add(this.launchButton);

    var battleBackground = game.add.image(0, 1680, 'pix');
    battleBackground.tint = 0x2f4f4f;
    battleBackground.width = 1080;
    battleBackground.height = 1440;
    this.add(battleBackground);

    var hpBar = game.add.image(20, 1700, 'pix');
    hpBar.tint = 0x00ff00;
    hpBar.width = 1040;
    hpBar.height = 80;
    this.add(hpBar);
    var mpBar = game.add.image(20, 1800, 'pix');
    mpBar.tint = 0x0000ff;
    mpBar.width = 1040;
    mpBar.height = 80;
    this.add(mpBar);

    // XXX debug only
    battleBackground.inputEnabled = true;
    battleBackground.events.onInputUp.add(function() {
        ms.battle.victory();
    }, this);
    // XXX end debug only
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.updateSurroundings = function(number) {
    this.surroundingEnemies.setText("Surrounded by: " + number);
};
Hud.prototype.startBattleMode = function() {
    this.inputMask.inputEnabled = true;
    this.y = -1200;
    this.markButton.x = -540;
    this.launchButton.x = 1080 + 540;
};
Hud.prototype.endBattleMode = function() {
    this.inputMask.inputEnabled = false;
    this.y = 0;
    this.markButton.x = 360;
    this.launchButton.x = 720;
};

module.exports = Hud;