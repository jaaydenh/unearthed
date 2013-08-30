import ui.View;
import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameMode: opts.gameModel,
			gameView: opts.gameView,
			id: 112,
			description: 'Gold is valuable and get be exchanged for useful items'
		});

		supr(this, 'init', [opts]);

		this._upgradeTile = "goldbag";
		this._stayVisible = true;
		this._stealInRow = true;
		this._tileToSteal = "goldcoin";
		this._stealingTile = "goblin"
		this._stealInColumn = true;
	};

	this.activateTile = function () {
		
		this.threeInARow();
	}
});