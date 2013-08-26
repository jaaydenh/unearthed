import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.models.MoonModel as MoonModel;
import animate;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 109,
			description: 'Finding the sun causes night to become day and has many effects including hiding old tiles from view'
		});

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {

		//gameScreen._gui_frame.setImage(gameScreen.gui_night_img);

		this._gameModel.setDayTime(true);

		this._gameModel.addTileToDeck('moon');
		this._gameModel.shuffleDeck();

		animate(this).wait(1000)
		.then(bind(this, function () {
			this._gameView.replaceTile(this);
		}))
	}
});