import ui.View;
import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameMode: opts.gameModel,
			gameView: opts.gameView,
			id: 125,
			description: 'Fairies will grant an additional life'
		});

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {
		
	}
});