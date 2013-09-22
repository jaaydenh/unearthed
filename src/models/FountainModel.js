import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 119,
			description: 'A fountain'
		});		  

		supr(this, 'init', [opts]);
		
		this._displayType = 'SpriteView';
		this._animation = 'fountain/fountain';
	};

	this.activateTile = function () {

	}

});