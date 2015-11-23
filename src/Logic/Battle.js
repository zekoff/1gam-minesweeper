/* global ms */

var Battle = function(tile) {
    ms.battle = this;
    this.battleTile = tile;
};
Battle.prototype = {};
Battle.prototype.constructor = Battle;
Battle.prototype.begin = function() {
    ms.hud.startBattleMode();
};
Battle.prototype.victory = function() {
    // TODO display battle results
    this.battleTile.destroyEnemies();
    ms.hud.endBattleMode();
    ms.player.moveToTile(this.battleTile);
    ms.battle = null;
};

module.exports = Battle;