import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import animate;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 101,
			description: 'You are lost in the forest. All that was revealed is now hidden'
		});

		supr(this, 'init', [opts]);
		  
		this._hideAll = true;
		this._notAdjacent = true;
		this._notAdjacentTile = 'path';
	};

	this.activateTile = function () {
		// replace this tile with a new tile hide this tile after 1 second, replace with a new tile then hide all tiles
		animate(this).wait(1000)
		.then(bind(this, function () {
			this._gameView.replaceTile(this);
			this._gameView.resetAllTiles();	
		}))
	}
});