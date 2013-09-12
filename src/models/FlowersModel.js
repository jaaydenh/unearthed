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
			description: 'An almost entirely uninteresting patch of flowers. However, flowers never grow near goblins'
		});		  

		supr(this, 'init', [opts]);
		
		this._upgradeTile = "fairy";
		this._notAdjacent = true;
		this._notAdjacentTile = 'goblin';
	};

	this.activateTile = function () {

		this.threeInARow();
	}

});