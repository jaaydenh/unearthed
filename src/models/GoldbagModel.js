import ui.View;
import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameMode: opts.gameModel,
			gameView: opts.gameView,
			id: 121,
			description: 'Bags of gold are worth 10 gold coins'
		});

		supr(this, 'init', [opts]);

		this._stayVisible = true;
		this._stealInRow = true;
		this._tileToSteal = "goldcoin";
		this._stealingTile = "goblin"
		this._stealInColumn = true;
		this._valuable = true;
	};

	this.activateTile = function () {
		
	}
});