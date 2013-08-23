import ui.View;
import src.sounds.soundManager as soundManager;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import event.Emitter as Emitter;
import animate;
import src.util.Utility as Utility;
import src.models.RuneModel as RuneModel;
import src.views.RuneView as RuneView;
import src.views.StoreView as StoreView;
import src.views.TrapGameView as TrapGameView;

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
		this._game = opts.game;
		
		this._tileNumber = -1;
		this._defaultTileType = 'tree';
		this._bones = 0;

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
		this._isDaytime = false;
		this._causeDamage = false;
		this._stayVisible = true;
		this._positionRule = '';
		this._id = 0;
		this._adjacentTile = false;
		this._hideAll = false;
		this._notAdjacent = false;
		this._notAdjacentTile = false;
		this._diagonal = false;
		this._adjacent = false;
		this._description = 'default description';
		this._isCompanion = false;
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
		this._trap = false;
		this._shuffleInitiator = false;
		this._rune = false;
		this._creature = false;
		this._campfire = false;
		this._store = false;
		this._upgradeTile = '';
		this._sleepInDay = false;
		this._sleeping = false;
		this._sleepingtile = '';
		this._wakingtile = '';
		this._isLoud = false;
		this._goalActive = false;
	}

	this.updateImage = function(image) {
		this.emit('UpdateImage', image);
	}

	this.setTileRules = function() {

		switch (this._tileType)
		{
		case "lost":
		  this._id = 101;
		  this._stayVisible = false;
		  this._hideAll = true;
		  this._notAdjacent = true;
		  this._notAdjacentTile = 'path';
		  this._description = 'You are lost in the forest. Everything uncovered is now hidden';
		  break;
		case "path":
		  this._id = 102;
		  this._stayVisible = true;
		  this._adjacent = true;
		  this._diagonal = true;
		  this._adjacentTile = 'path';
		  this._description = 'Find the all the paths along with the travellers portal to exit this area.';
		  break;
		case "dog":
		  this._id = 103;
		  this._isCompanion = true;	
		  this._isSpecial = true;
		  this._description = 'A loyal companion that loves finding bones. Rescue this creature to bring this companion along on future levels';
		  break;
		case "witch":
		  this._id = 104;
		  this._stayVisible = true;
		  this._scrambleAdjacent = true;
		  this._creature = true;
		  this._description = 'Witches love to confuse travellers with their magic but have a love for black cats';
		  break;
		case "rabbit":
		  this._id = 105;
		  this._stayVisible = false;
		  this._description = 'test description';
		  break;
		case "goblinberries":
		  this._id = 106;	
		  this._stayVisible = false;
		  this._removeGoblin = true;
		  this._description = 'test description';
		  break;
		case "heart":
		  this._id = 107;
		  this._moveToInventory = true;
		  this._addHeart = true;
		  this._description = 'test description';
		  break;
		case "moon":
		  this._id = 108;
		  this._stayVisible = true;
		  this._changeToNight = true;
		  this._description = 'test description';
		  break;
		case "sun":
		  this._id = 109;
		  this._stayVisible = true;
		  this._changeToDay = true;
		  this._description = 'test description';
		  break;
		case "door":
		  this._id = 110;
		  this._stayVisible = false;
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
		case "goldcoin":
		  this._id = 112;
		  this._threeInaRow = true;
		  this._upgradeTile = "goldbag";
		  this._stayVisible = true;
		  this._stealInRow = true;
		  this._tileToSteal = "goldcoin";
		  this._stealingTile = "goblin"
		  this._stealInColumn = true;
		  this._description = 'Gold is valuable and get be exchanged for useful items';
		  break;
		case "key":
		  this._id = 113;
		  this._stayVisible = true;
		  this._shuffleRow = true;
		  this._shuffleColumn = true;
		  this._shuffleTrigger = "goblin";
		  this._description = 'Needed to unlock the travelers portals';
		  break;
		case "ogre":
		  /*this._id = 114;
		  this._dangerous = true;
		  this._stayVisible = false;
		  this._causeDamage = true;
		  this._sleepInDay = true;
		  this._sleepingtile = 'ogre_sleeping';
		  this._damage = 1;
		  this._creature = true;
		  this._description = 'Big, ugly and they hurt';*/
		break;
		case "rock":
		  this._id = 115;	
		  this._stayVisible = false;
		  this._description = 'Mostly uninteresting but the number of bones can tell how many dangerous creatures are nearby';
		break;
		case "trap":
		  this._id = 116;
		  this._adjacent = true;
		  this._adjacentTile = "goldcoin"
		  this._dangerous = true;
		  this._stayVisible = false;
		  this._trap = true;
		  this._description = 'Avoid traps at all cost. There is the risk of getting captured by goblins';
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
		case "store":
		  this._id = 120;	
		  this._store = true;
		  this._description = 'Stores randomly appear and are a great place to use all that hard earned gold';
		break;
		case "goldbag":
		  this._id = 121;
		  this._description = 'Worth 10 gold coins';
		break;
		case "singingflower":
		  this._id = 123;
		  this._description = 'A very noisy flower which has been known to wakeup nearby sleeping monsters';
		  this._isLoud = true;
		break;  
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

	this.getDescription = function() {
		return this._description;
	}

	this.activateTile = function () {
		//this._visible = true;
		this.processTileRules();
		//this._game.unlock();
	};
	
	this.updateGame = function() {
		this._game.checkGoblinsVisible();
		this._game.checkHintTileStates();
		this._game.checkStatus();

		if (this._stayVisible === false && this._game.isDaytime() == false) {
			this.resetTile();
		}	
	}

	this.moveToTile = function(tileNum, replaceTile) {
		this.emit('MoveToTile', {tileNum: tileNum, replaceTile: replaceTile});
	}
	
	this.replaceTile = function() {
		this._game.replaceTile(this);
	}
	
	this.processTileRules = function() {
		var didStealOrShuffle = false;

		if (this._tileType == 'goblin') {
			this._game.getGameModel().updateVisibleGoblins(1);
		}

		// replace this tile with a new tile hide this tile after 1 second, replace with a new tile then hide all tiles
		if (this._hideAll == true) {
			
			animate(this).wait(1000)
			.then(bind(this, function () {
				this._game.replaceTile(this);
				this._game.resetAllTiles();	
			}))
		}
		
		/*if (this._store == true) {
			this._game.storeView = new StoreView({
				game: this._game
			})
			this._game.addSubview(this._game.storeView);
			this._game.storeView.show();
		}*/

		if (this._campfire == true) {

			var runeModel = new RuneModel( 
			{
				game: this._game,
				runeType: 'campfire'
			});

			var runeView = this._game.runeViewPool.obtainView();

			runeView._runeType = 'campfire';
			runeView.setRuneImage('campfire');
			runeView.style.visible = true;

			runeModel.
				on('Update', bind(runeView, 'onUpdate')).
				on('Remove', bind(runeView, 'onRemove'));

			animate(this).wait(400)
			.then(bind(this, function() {
				this._game.replaceTile(this);

				runeModel.placeRune();
			}))
		}

		if (this._isLoud == true) {
			var sleepingTiles = this._game.getAllTileWithRule("_sleeping");

			sleepingTiles.forEach(function(tile) {
				tile.wake();
			})
		} 

		if (this._threeInaRow == true) {
			//Check row for 3 in a row
			var tileRow = this._game.getTileRow(this._tileNumber);
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
				var tileCol = this._game.getTileCol(this._tileNumber);
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
						this._game.getTileInLayout(tileNum).moveToTile(this._tileNumber, replaceTile);		
					}
				}))
				// replace current tile with upgraded tile 
				this.setTileType(this._upgradeTile);
			}
		}
	
		//if (tile.isCompanion == true) {
		//	this._game.processCompanionTile(this);
		//}

		//if (tile.removeGoblin == true) {
		//	didStealOrShuffle = goblinEatsBerries(tile, gameScreen);
		//}	

		if (this._scrambleAdjacent == true) {
			this._game.scrambleAdjacentTiles(this);
		}

		//if (tile.moveToInventory == true) {
		//	gameScreen._playerModel.moveToInventory(tile);
		//}

		if (this._trap == true) {
			this._game.trapGameView = new TrapGameView({
				game: this._game
			})
			this._game.addSubview(this._game.trapGameView);
			this._game.trapGameView.show();
		}	

		/*if (this._causeDamage == true) {

			//this.sound.play('orchit');
			soundManager.play('orc_hit');
			this._game.getPlayerModel().removeHeart();

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

		}*/
		
		/*if (this._changeToNight == true) {
			gameScreen._gui_frame.setImage(gameScreen.gui_night_img);

			var dayTile = new Tile('sun');
			bindExploreToTile(dayTile, gameScreen);
			sendTileToDrawPile(dayTile, gameScreen);

			var newTile = replaceTile(tile, gameScreen);
			animate(tile).wait(1000).then({opacity:0},500)
			.then(bind(gameScreen, function () {
				gameScreen.removeSubview(tile);
				gameScreen.addSubview(newTile);
			}))

			this._playerModel.setGameTime('night');
			gameScreen.isDaytime = false;
		}

		if (this._changeToDay == true) {
			gameScreen._gui_frame.setImage(gameScreen.gui_day_img);

			var nightTile = new Tile('moon');
			bindExploreToTile(nightTile, gameScreen);
			sendTileToDrawPile(nightTile, gameScreen);
			
			var newTile = replaceTile(tile, gameScreen);
			animate(tile).wait(1000).then({opacity:0},500)
			.then(bind(gameScreen, function () {
				gameScreen.removeSubview(tile);
				gameScreen.addSubview(newTile);
			}))

			this._playerModel.setGameTime('day');
			gameScreen.isDaytime = true;
		}*/
		
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
				didStealOrShuffle = this._game.shuffleRow(this);
			}
		} 
		if (didStealOrShuffle == false) {
		  	if (this._shuffleColumn == true) {
				didStealOrShuffle = this._game.shuffleColumn(this);
			}
		} 

		if (this._tileType == this._game.goalTiles[0]) {
			//if (this._goalActive == true) {
				this._game.checkForGoal();
			//} else {
			//	var activateGoal = this._game.checkToActivateGoal();
			//	if (activateGoal == true) {
			//		this._goalActive = true;
			//	}
			//}
		}


	};

	this.wake = function() {
		if (this._wakingtile != '') {
			this._tileType = this._wakingtile;
			this._setDefaults();
			this.setTileRules();
			this._visible = true;
			this.updateImage(this._tileType);
			this.emit('Wake');	
		}
	}

	this.resetTile = function() {

		this.emit('Reset');
		
		if (this._tileType == 'goblin' && this._visible == true) {
			this._game.getGameModel().updateVisibleGoblins(-1);
		}
		this._visible = false;
	};
});
