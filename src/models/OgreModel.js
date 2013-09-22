import ui.View;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import animate;
import src.util.Utility as Utility;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 114,
			description: 'Big, ugly and they hurt',
		});

		supr(this, 'init', [opts]);

		this._dangerous = true;
		this._stayVisible = false;
		this._damage = 1;
		this._creature = true;

		if (this._gameModel.isDaytime() == true) {
			this._sleeping = true;
		}
	};

	this.activateTile = function () {

		if (this._sleeping === false) {

			soundManager.play('orc_hit');
			for (var i = 0;i<this._damage;i++) {
				this._gameView.getPlayerModel().removeHeart();	
			}
			
			animate(this._gameView).now({x:50,y:-15},70)
			.then({x:-50,y:20},70)
			.then({x:50,y:30},70)
			.then({x:-50,y:30},70)
			.then({x:50,y:20},70)
			.then({x:0, y:0},70);

			if (this._gameView.getPlayerModel().getHearts() == 0) {
				this._gameView.lose = true;
				this._gameView.loseMessage = "You have lost all your hearts!";
			}

		}
	}
});