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

		this._dangerous = true;
		this._stayVisible = false;
		this._causeDamage = true;
		this._sleepInDay = true;
		this._damage = 1;
		this._creature = true;

		opts = merge(opts, {
			game: opts.game,
			id: 114,
			description: 'Big, ugly and they hurt',

		});

		supr(this, 'init', [opts]);

		if (this._game.isDaytime() == true) {
			this._sleeping = true;
		}
	};

	this.activateTile = function () {

		if (this._sleeping === false) {

			soundManager.play('orc_hit');
			for (var i = 0;i<this._damage;i++) {
				this._game.getPlayerModel().removeHeart();	
			}
			
			animate(this._game).now({x:50,y:-15},70)
			.then({x:-50,y:20},70)
			.then({x:50,y:30},70)
			.then({x:-50,y:30},70)
			.then({x:50,y:20},70)
			.then({x:0, y:0},70);

			if (this._game.getPlayerModel().getHearts() == 0) {
				this._game.lose = true;
				this._game.loseMessage = "You have lost all your hearts!";
			}

		}
	}
});