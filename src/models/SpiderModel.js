import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 125,
			description: 'Spiders usually just go splat!!! but sometimes can be a bit more dangerous'
		});

		supr(this, 'init', [opts]);

		this._activatedCount = 0;
		this._splat = false;
	};

	this.activateTile = function () {

		if (this._activatedCount > 0 && this._splat == false) {

			soundManager.play('splat');
			this.updateImage('spider_splat');
			this._splat = true;
		}

		this._activatedCount++;
	}
});