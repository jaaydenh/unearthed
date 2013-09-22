import src.constants.gameConstants as gameConstants;
import src.models.TileModel as TileModel;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;

exports = Class(TileModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			gameModel: opts.gameModel,
			gameView: opts.gameView,
			tileType: opts.tileType,
			id: 111,
			description: 'Harmless when found alone but if a group of 3 or more is visible, you will be captured and your journey will be over'
		});

		supr(this, 'init', [opts]);
		  
		  this._dangerous = true;
		  this._stayVisible = true;
		  this._adjacent = true;
		  this._adjacentTile = "goblin";
		  this._shuffleRow = true;
		  this._shuffleColumn = true;
		  this._shuffleTrigger = "key";
		  this._shuffleInitiator = true;
		  this._stealInRow = true;
		  this._tileToSteal = "goldcoin";
		  this._stealingTile = "goblin";
		  this._stealInColumn = true;
		  this._creature = true;
	};

	this.activateTile = function () {
		
		if (this._visible == false) {
			soundManager.play('evil_laugh');
			this._gameModel.updateVisibleGoblins(1);	
		}
		
		var didStealOrShuffle = false;

		if (didStealOrShuffle == false) {
			didStealOrShuffle = this._gameView.stealInRow(this);
		}
		if (didStealOrShuffle == false) {
			didStealOrShuffle = this._gameView.stealInColumn(this);
		}
		if (didStealOrShuffle == false) {
			didStealOrShuffle = this._gameView.shuffleRow(this);
		} 
		if (didStealOrShuffle == false) {
			didStealOrShuffle = this._gameView.shuffleColumn(this);
		} 
	}
});