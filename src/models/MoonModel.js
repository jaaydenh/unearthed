import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.models.SunModel as SunModel;
import animate;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 108,
			description: 'Finding the moon causes day to become night and has many effects including hiding old tiles from view'
		});

		supr(this, 'init', [opts]);
	};

	this.activateTile = function () {

		//gameScreen._gui_frame.setImage(gameScreen.gui_night_img);

		this._gameModel.setDayTime(false);

		this._gameModel.addTileToDeck('sun');
		this._gameModel.shuffleDeck();

		animate(this).wait(1000)
		.then(bind(this, function () {
			this._gameView.replaceTile(this);
			this._gameView.resetNonStayVisibleTiles();	
		}))
	};
});