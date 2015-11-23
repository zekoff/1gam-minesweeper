/* global Phaser, game, ms */

var Hud = function() {
    this.wrapper = game.add.group();
    this.wrapper.fixedToCamera = true;
    Phaser.Group.call(this, game);
    ms.hud = this;
    this.inputMask = game.add.image(0, 0, 'pix');
    this.inputMask.width = 1080;
    this.inputMask.height = 1920;
    this.inputMask.tint = 0x000000;
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

    this.textArea = game.add.image(20, 1940, 'pix');
    this.textArea.width = 1040;
    this.textArea.height = 700;
    this.textArea.tint = 0xffffff;
    this.add(this.textArea);

    // XXX debug only
    battleBackground.inputEnabled = true;
    battleBackground.events.onInputUp.add(function() {
        // ms.battle.victory();
        this.addText("You did " + game.rnd.between(10,20) + " damage!");
        this.addText("The enemy did " + game.rnd.between(10,20) + " damage...");
    }, this);
    var winButton = game.add.image(20, 2800, 'pix');
    winButton.width = 1040;
    winButton.height = 200;
    winButton.inputEnabled = true;
    winButton.events.onInputUp.add(function() {
        ms.battle.victory();
    });
    winButton.tint = 0x00ff00;
    this.add(winButton);
    // XXX end debug only
};
Hud.prototype = Object.create(Phaser.Group.prototype);
Hud.prototype.constructor = Hud;
Hud.prototype.updateSurroundings = function(number) {
    this.surroundingEnemies.setText("Surrounded by: " + number);
};
Hud.prototype.startBattleMode = function() {
    this.text = [];
    if (this.content) this.content.destroy();
    this.content = null;
    this.addText("Battle!");

    this.playerPlatform = game.add.image(270, 1440, ms.player.currentTile.key);
    this.playerPlatform.anchor.set(0.5);
    this.playerPlatform.height = 300;
    this.playerPlatform.width = 500;
    this.add(this.playerPlatform);
    this.playerDisplay = game.add.image(270, 1440, 'pix');
    this.playerDisplay.anchor.set(0.5, 1);
    this.playerDisplay.width = ms.player.width * 2;
    this.playerDisplay.height = ms.player.height * 2;
    this.add(this.playerDisplay);

    this.enemyPlatform = game.add.image(810, 1440, ms.battle.battleTile.key);
    this.enemyPlatform.anchor.set(0.5);
    this.enemyPlatform.height = 300;
    this.enemyPlatform.width = 500;
    this.add(this.enemyPlatform);
    this.enemyDisplay = game.add.image(810, 1440, 'pix');
    this.enemyDisplay.anchor.set(0.5, 1);
    this.enemyDisplay.width = ms.player.width * 2;
    this.enemyDisplay.height = ms.player.height * 2;
    this.add(this.enemyDisplay);

    this.inputMask.inputEnabled = true;
    this.inputMask.alpha = 0.4;
    this.y = -1200;
    this.markButton.x = -540;
    this.launchButton.x = 1080 + 540;
};
Hud.prototype.endBattleMode = function() {
    this.playerPlatform.destroy();
    this.playerDisplay.destroy();
    this.enemyPlatform.destroy();
    this.enemyDisplay.destroy();
    this.inputMask.inputEnabled = false;
    this.inputMask.alpha = 0;
    this.y = 0;
    this.markButton.x = 360;
    this.launchButton.x = 720;
};
Hud.prototype.addText = function(text, color) {
    this.text.push(text);
    if (typeof color === 'undefined') color = 0x000000;
    if (this.content)
        this.content.destroy();
    this.content = game.make.bitmapText(30, 2620, 'font', this.text.join('\n'), 60);
    this.content.anchor.set(0, 1);
    this.content.maxWidth = 1020;
    this.content.tint = 0xcc8080;
    while (this.content.height > this.textArea.height) {
        this.text.shift();
        this.content.setText(this.text.join('\n'));
    }
    this.add(this.content);
};

module.exports = Hud;