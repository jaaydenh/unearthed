import ui.View;
import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameMode: opts.gameModel,
			gameView: opts.gameView,
			id: 123,
			description: 'A very noisy flower which has been known to wakeup nearby sleeping monsters'
		});

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {

		var sleepingTiles = this._gameView.getAllTileWithRule("_sleeping");

		sleepingTiles.forEach(function(tile) {
			tile.wake();
		})
	}
});