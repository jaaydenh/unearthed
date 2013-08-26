import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 105,
			description: 'This companion will help sniff out a new tile and allow you to peek to see what a tile is without suffering the consequences'
		});

		supr(this, 'init', [opts]);

		this._isSpecial = true;
	};

	this.activateTile = function () {


	}
});