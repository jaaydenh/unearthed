import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import animate;
import src.util.Utility as Utility;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.views.StoreView as StoreView;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 103,
			description: 'A loyal companion that loves finding bones. Rescue this creature to bring this companion along on future levels'
		});

		supr(this, 'init', [opts]);

		this._isSpecial = true;
	};

	this.activateTile = function () {


	}
});