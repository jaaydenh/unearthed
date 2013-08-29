import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			id: 104,
			description: 'Witches love to confuse travelers with their magic but have a love for black cats'
		});

		supr(this, 'init', [opts]);
		  
		this._stayVisible = true;
		this._scrambleAdjacent = true;
		this._creature = true;
	};

	this.activateTile = function () {
		var playerModel = this._gameView.getPlayerModel();
		if (playerModel.isItemInInventory('cat')) {
			// show choice dialog
			this._gameView.choiceDialog.setDialog('Its so nice to see you have a black cat with you. Instead of using my magic on you, I give you the choice of (A) an extra heart or (B) 5 coins');
			this._gameView.choiceDialog.setChoices(this.addHeart, this.addGold);
			this._gameView.choiceDialog.show();
		} else {
			this._gameView.scrambleAdjacentTiles(this);	
		}
		
	}

	this.addHeart = function() {
		this._gameView.getPlayerModel().addHeart();
	}

	this.addGold = function() {
		var playerModel = this._gameView.getPlayerModel();
		var currentGold = Data.getItem("gold");
		Data.setItem("gold", currentGold + 5);
		playerModel.updateGold();	
	}
});