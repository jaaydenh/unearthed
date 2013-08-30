import ui.View;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import animate;
import src.util.Utility as Utility;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.views.TrapGameView as TrapGameView;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameMode: opts.gameModel,
			gameView: opts.gameView,
			id: 116,
			description: 'Avoid traps at all cost. There is the risk of getting captured by goblins'
		});

		this._adjacent = true;
		this._adjacentTile = "goldcoin"
		this._dangerous = true;

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {
		
		this._gameView.trapGameView = new TrapGameView({
			game: this._gameView
		})
		this._gameView.addSubview(this._gameView.trapGameView);
		this._gameView.trapGameView.show();
	}
});