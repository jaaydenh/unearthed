import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 126,
			description: 'A brightly colored poisonous mushroom'
		});

		supr(this, 'init', [opts]);

	};

	this.activateTile = function () {


	}
});