import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 122,
			description: 'A feline companion that can be a big help when meeting witches'
		});

		supr(this, 'init', [opts]);

		this._isSpecial = true;
	};

	this.activateTile = function () {


	}
});