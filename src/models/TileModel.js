import ui.View;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import event.Emitter as Emitter;
import animate;
import src.util.Utility as Utility;
import src.models.RuneModel as RuneModel;
import src.views.RuneView as RuneView;

var X_OFFSET = 30;
var Y_OFFSET = 0;
var Y_PADDING = 0;
var X_PADDING = 0;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		this._setDefaults();

		opts = merge(opts, {
			width:	gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE
		});

		this._id = opts.id;
		this._description = opts.description;
		this._tileType = opts.tileType;
		this._gameView = opts.gameView;		
		this._gameModel = opts.gameModel;

		this._tileNumber = -1;
		this._defaultTileType = 'tree';
		this._bones = 0;
		this._activationDecay = 0;

		supr(this, 'init', [opts]);

		if (this._tileType == 'disabled') {
			this._disabled = true;
		} else {
			this._disabled = false;
		}

		this.setTileRules();
	};

	this._setDefaults = function() {
		this._visible = false;
		this._stayVisible = false;
		this._positionRule = '';
		this._id = 0;
		this._adjacentTile = false;
		this._hideAll = false;
		this._notAdjacent = false;
		this._notAdjacentTile = false;
		this._diagonal = false;
		this._adjacent = false;
		this._description = 'default description';
		this._scrambleAdjacent = false;
		this._removeGoblin = false;
		this._addHeart = false;
		this._changeToNight = false;
		this._changeToDay = false;
		this._dangerous = false;
		this._shuffleRow = false;
		this._shuffleColumn = false;
		this._shuffleTrigger = '';
		this._stealInRow = false;
		this._tileToSteal = '';
		this._stealingTile = '';
		this._stealInColumn = false;
		this._threeInaRow = false;
		this._shuffleInitiator = false;
		this._rune = false;
		this._creature = false;
		this._campfire = false;
		this._upgradeTile = '';
		this._sleeping = false;
		this._goalActive = false;
	}

	this.updateImage = function(image) {
		this.emit('UpdateImage', image);
	}

	this.setTileRules = function() {

		switch (this._tileType)
		{
		case "path":
		  this._id = 102;
		  this._adjacent = true;
		  this._diagonal = true;
		  this._adjacentTile = 'path';
		  this._description = 'Find the all the paths along with the travellers portal to exit this area.';
		  break;
		case "goblinberries":
		  this._id = 106;	
		  this._removeGoblin = true;
		  this._description = 'test description';
		  break;
		case "heart":
		  this._id = 107;
		  this._moveToInventory = true;
		  this._addHeart = true;
		  this._description = 'test description';
		  break;
		case "door":
		  this._id = 110;
		  this._stayVisible = true;
		  this._description = 'This is one of the lost travelers portals. Use these to exit this area';
		  break;
		case "goblin":
		  this._id = 111;
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
		  this._description = 'Harmless when found alone but if a group of 3 or more is visible, you will be captured and your journey will be over.';
		  break;
		case "key":
		  this._id = 113;
		  this._stayVisible = true;
		  this._shuffleRow = true;
		  this._shuffleColumn = true;
		  this._shuffleTrigger = "goblin";
		  this._description = 'Needed to unlock the travelers portals';
		  break;
		case "rock":
		  this._id = 115;	
		  this._description = 'Mostly uninteresting but the number of bones can tell how many dangerous creatures are nearby';
		break;
		case "campfire":
		  this._id = 117;
		  this._rune = true;
		  this._campfire = true;
		  this._description = 'Creatures both good or evil may be lurking near a campfire';
		break;
		case "sign":
		  this._id = 118;
		  this._description = 'A warning sign left behind by a previous traveller';
		break;
		case "flowers":
		  this._id = 119;
		  this._notAdjacent = true;
		  this._notAdjacentTile = 'goblin';
		  this._description = 'An almost entirely uninteresting patch of flowers. However, flowers never grow near goblins';
		break;
		case "goldbag":
		  this._id = 121;
		  this._description = 'Worth 10 gold coins';
		break;
		}
	}

	this.setActivationDecay = function(decay) {
		this._activationDecay = decay;
	}

	this.getActivationDecay = function() {
		return this._activationDecay;
	}

	this.threeInARow = function() {

		//Check row for 3 in a row
		var tileRow = this._gameView.getTileRow(this._tileNumber);
		var sequentialTiles = [];

		for (var i = 0; i < tileRow.length; i++) {
			var tile = tileRow[i];
			if (tile.getTileType() == this._tileType && tile.isVisible() == true) {
				sequentialTiles.push(tile.getTileNumber());
			} else {
				sequentialTiles.length = 0;
			}

			if (sequentialTiles.length == 3) {
				break;
			}
		}
		//Check col for 3 in a row
		if (sequentialTiles.length < 3) {
			sequentialTiles.length = 0;
			var tileCol = this._gameView.getTileCol(this._tileNumber);
			for (var i = 0; i < tileCol.length; i++) {
				var tile = tileCol[i];
				if (tile.getTileType() == this._tileType && tile.isVisible() == true) {
					sequentialTiles.push(tile.getTileNumber());
				} else {
					sequentialTiles.length = 0;
				}

				if (sequentialTiles.length == 3) {
					break;
				}
			}
		}
		// if 3 in a row
		if (sequentialTiles.length == 3) {
			var replaceTile = true;
			sequentialTiles.forEach(bind(this,function(tileNum) {
				if (tileNum != this._tileNumber) {
					// move adjacent tiles to current tile and replace adjacent tiles with tile from deck
					this._gameView.getTileInLayout(tileNum).moveToTile(this._tileNumber, replaceTile);		
				}
			}))
			// replace current tile with upgraded tile 
			this.setTileType(this._upgradeTile);
		}
	}
	
	this.getPositionRule = function() {
		return this._positionRule;
	}
	
	this.removeView = function() {
		this.emit('RemoveView');
	}
	
	this.setTileNumber = function(num) {
		this._tileNumber = num;
		this.emit('Update', this._tileNumber);
	}
    
    this.getTileNumber = function() {
  		return this._tileNumber;
    }
	
	this.setTileType = function (type) {
		this._tileType = type;
		this.emit('UpdateTileType', type);
	}
	
	this.getTileType = function () {
		return this._tileType;
	}
	
	this.isVisible = function() {
		return this._visible;
	}
	
	this.setVisible = function(visible) {
		this._visible = visible;
	}

	this.getStayVisible = function() {
		return this._stayVisible;
	}

	this.getDescription = function() {
		return this._description;
	}

	this.activateTile = function () {
		//this._visible = true;

		this.processTileRules();
	};
	
	this.updateGame = function() {
		this._gameView.checkGoblinsVisible();
		this._gameView.checkHintTileStates();
		this._gameView.updateTileVisibility();

		var isGoalTile = false;

		for (var i =0 ;i<this._gameView.goalTiles.length;i++) {
			if (this._tileType == this._gameView.goalTiles[i]) {
				isGoalTile = true;
			}
		}

		if (isGoalTile == true) {
			if (this._gameView.isGoalActive() == true) {
				if (this._tileType == 'door') {
					this._gameView.checkForGoal(this);	
				}				
			} else {
				this._gameView.checkToActivateGoal();
				//if (activateGoal == true) {
				//	this._game.setGoalActive(_goalActive = true;
				//}
			}
		}

		this._gameView.checkGameStatus();

		//if (this._stayVisible === false && this._gameModel.isDaytime() == false) {
		//	this.resetTile();
		//}	
	}

	this.moveToTile = function(tileNum, replaceTile) {
		this.emit('MoveToTile', {tileNum: tileNum, replaceTile: replaceTile});
	}
	
	this.replaceTile = function() {
		this._gameView.replaceTile(this);
	}
	
	this.processTileRules = function() {
		var didStealOrShuffle = false;

		if (this._tileType == 'goblin') {
			this._gameModel.updateVisibleGoblins(1);
		}

		if (this._campfire == true) {

			var runeModel = new RuneModel( 
			{
				game: this._gameView,
				runeType: 'campfire'
			});

			var runeView = this._gameView.runeViewPool.obtainView();

			runeView._runeType = 'campfire';
			runeView.setRuneImage('campfire');
			runeView.style.visible = true;

			runeModel.
				on('Update', bind(runeView, 'onUpdate')).
				on('Remove', bind(runeView, 'onRemove'));

			animate(this).wait(400)
			.then(bind(this, function() {
				this._gameView.replaceTile(this);

				runeModel.placeRune();
			}))
		}

		//if (tile.removeGoblin == true) {
		//	didStealOrShuffle = goblinEatsBerries(tile, gameScreen);
		//}	
		
		/*if (tile.stealInRow != null && didStealOrShuffle == false) {
		  	if (tile.stealInRow == true) {
				didStealOrShuffle = stealInRow(tile, gameScreen);
			}
		}
		if (tile.stealInColumn != null && didStealOrShuffle == false) {
		  	if (tile.stealInColumn == true) {
				didStealOrShuffle = stealInColumn(tile, gameScreen);
			}
		}*/
		if (didStealOrShuffle == false) {
		  	if (this._shuffleRow == true) {
				didStealOrShuffle = this._gameView.shuffleRow(this);
			}
		} 
		if (didStealOrShuffle == false) {
		  	if (this._shuffleColumn == true) {
				didStealOrShuffle = this._gameView.shuffleColumn(this);
			}
		} 
	};

	this.isSleeping = function() {
		return this._sleeping;
	}

	this.setGlow = function(visible) {
		this.emit('SetGlow', visible);
	}

	this.wake = function() {
		this._sleeping = false;
		this.emit('Wake');	
	}

	this.resetTile = function() {

		this.emit('Reset');
		
		if (this._tileType == 'goblin' && this._visible == true) {
			this._gameModel.updateVisibleGoblins(-1);
		}
		this._visible = false;
		this._activatedCount = 0
	};
});
