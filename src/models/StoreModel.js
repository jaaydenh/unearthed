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
			game: opts.game,
			id: 112,
			description: 'stores randomly appear and are a great place to use all that hard earned gold',

		});

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {

		this._game.storeView = new StoreView({
			game: this._game
		})
		this._game.addSubview(this._game.storeView);
		this._game.storeView.show();
	}
});