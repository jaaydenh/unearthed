import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 124,
			description: 'Caves hold unknown treasures or dangers'
		});

		supr(this, 'init', [opts]);

		this._activatedCount = 0;
	};

	this.activateTile = function () {

		if (this._activatedCount > 0) {
			var caveTiles = this._gameView.caveTiles;
			var tileIndex = Math.floor(Math.random() * caveTiles.length);
			var tileType = caveTiles[tileIndex];

			var tileModel = this._gameModel.createTileModel(tileType);

			this._gameView.swapTile(this, tileModel, true, false);
		}

		this._activatedCount++;
	}

});