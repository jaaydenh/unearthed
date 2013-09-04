import animate;
import ui.View as View;
import ui.TextView as TextView;
import src.models.PlayerModel as PlayerModel;
import src.views.PlayerView as PlayerView;
import src.models.GameStatusModel as GameStatusModel;
import src.views.GameStatusView as GameStatusView;
import ui.resource.Image as Image;
import menus.views.DocumentView as DocumentView;
import menus.views.MenuView as MenuView;
import menus.constants.menuConstants as menuConstants;
import src.constants.gameConstants as gameConstants;
import src.util.Data as Data;
import src.models.GameModel as GameModel;
import src.views.TileView as TileView;
import src.util.Utility as Utility;
import ui.ViewPool as ViewPool;
import ui.ImageView as ImageView;
import src.models.RuneModel as RuneModel;
import src.views.RuneView as RuneView;
import ui.ParticleEngine as ParticleEngine;
import src.views.LevelStartView as LevelStartView;
import src.views.dialogs.InfoView as InfoView;
import src.views.dialogs.ChoiceView as ChoiceView;

var currentLayout = [];
	
exports = Class(View, function (supr) {
	this.init = function (opts) {
		opts = merge(opts, {
			x: 0,
			y: 0
		});

		this.parent = opts.parent;
		this._locked = false;
		this._peekActive = false;
		supr(this, 'init', [opts]);
		this.style.width = gameConstants.GAME_WIDTH;
		this.style.height = gameConstants.GAME_HEIGHT;
		this.backgroundTileLayout = new Array(30);
		this.loseMessage = "";
		this.designView();
		this.resetView(opts);

		this.particleEngine = new ParticleEngine({
		  superview: this,
		  width: 1,
		  height: 1,
		  initCount: 1
		});
	};	

	this.releaseView = function(view, type) {
		if (type == 'tile') {
			this.tileViewPool.releaseView(view);
		} else if (type == 'rune') {
			this.runeViewPool.releaseView(view);
		} else if (type == 'background') {
			this.backgroundImageViewPool.releaseView(view);
		}
	}

	this.designView = function () {

        // initialize a ViewPool for ImageViews
        this.tileViewPool = new ViewPool({
            ctor: TileView,
            initCount: 50,
            initOpts: {
            	//superview: this,
                game: this,
                tileNumber: -1,
                tileType: "",
                background: "dirtstonebackground"
            }
        });
        this.runeViewPool = new ViewPool({
            ctor: RuneView,
            initCount: 20,
            initOpts: {
            	//superview: this,
                game: this,
                runeType: ""
            }
        });
        this.backgroundImageViewPool = new ViewPool({
            ctor: ImageView,
            initCount: 30,
            initOpts: {
                //superview: this,
                x: 0,
                y: 0,
				width: gameConstants.TILE_SIZE,
				height: gameConstants.TILE_SIZE
            }
        });

		this.gui_night_img = new Image({url: "resources/images/gui_frame_night.png"});
		this.gui_day_img = new Image({url: "resources/images/gui_frame_day.png"});

		var playerModel = new PlayerModel({
			game: this
		});
		this._playerModel = playerModel;

		this._playerView = new PlayerView({
			superview: this,
			game: this,
			playerModel: this._playerModel
			//backgroundColor: 'grey'
		});

		this._playerModel.
			on('UpdateGold', bind(this._playerView, 'onUpdateGold')).
			on('UpdateHearts', bind(this._playerView, 'onUpdateHearts')).
			on('AddInventoryItem', bind(this._playerView, 'onAddInventoryItem'));

		this._playerModel.initInventory();

		var gameStatusModel = new GameStatusModel({
			game: this
		});
		this._gameStatusModel = gameStatusModel;

		this._gameStatusView = new GameStatusView();

		this._gameStatusModel.
			on('UpdateGoblins', bind(this._gameStatusView, 'onUpdateGoblins')).
			on('UpdateGameTime', bind(this._gameStatusView, 'onUpdateGameTime'));

		this.addSubview(this._gameStatusView);

		/*this._gui_frame = new ImageView({
			superview: this,
			image: this.gui_day_img,
			x: 50,
			y: 0,
			width: 730,
			height: 576
		});*/

		/*this.player_frame = new ImageView({
			superview: this,
			image: this.player_frame_img,
			x: 730,
			y: 0,
			width: 294,
			height: 576
		});*/

		this.menuBtn = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: 70,
			height: 45,
			image: "resources/images/buttons/orange_button.png",
			zIndex: 1
		});
		this.menuBtnText = new TextView({
			parent: this.menuBtn,
			x: 0,
			y: 0,
			width: 70,
			height: 45,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});
		this.menuBtn.onInputSelect = bind(this, 'menuSelect');
		//this.menuBtn.onInputSelect = bind(this, 'tallyGold');
		this.goldText = new TextView({
			parent: this,
			width: 100,
			height: 50,
			text: Data.getItem("gold"),
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeColor: 'gold',
			strokeWidth: 4.5,
			canHandleEvents: false,
			visible: false
		});

		/*this.mapBtn = new ImageView({
			parent: this,
			x: 0,
			y: 55,
			width: 70,
			height: 45,
			image: "resources/images/buttons/orange_button.png",
			zIndex: 1
		});
		this.mapBtnText = new TextView({
			parent: this.mapBtn,
			x: 0,
			y: 0,
			width: 70,
			height: 45,
			text: "Map",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});
		this.mapBtn.onInputSelect = bind(this, 'mapSelect');*/

		this.levelStartView = new LevelStartView({
			game: this
		});

		this.infoView = new InfoView({

		});
		this.addSubview(this.infoView);
		
		this.choiceDialog = new ChoiceView({
			gameView: this
		});
		this.addSubview(this.choiceDialog);
	};


	this.getPlayerModel = function () {
		return this._playerModel;
	};

	this.getGameModel = function() {
		return this._gameModel;
	}

	this.menuSelect = function() {
		this.parent.end('map');
	};

	this.mapSelect = function() {
		this.parent.end('map');
	};
	
	this.getTileInLayout = function(tileNum) {
		return currentLayout[tileNum];
	}

	this.getTilesWithProperty = function(property, visible) {
		var tiles = [];
		currentLayout.forEach(function(tile) {
			if (tile[property] == true && tile._visible == visible) {
				tiles.push(tile);
			}
		});

		return tiles;
	}

	this.resetView = function(opts) {

		this.specialsFound = [];
		this.tileViewPool.releaseAllViews();	
		this.backgroundImageViewPool.releaseAllViews();
		this.runeViewPool.releaseAllViews();

		var data = opts.level.shift();
		this._gameModel = new GameModel({
			gameView: this,
			gridWidth: data.gridWidth,
			gridHeight: data.gridHeight,
			isDaytime: data.isDaytime
			//data: opts.level.shift()
		});
		
		this._multiSelectActive = false;
		this._goalActive = false;
		this._specials = Data.getItem("specials");
		this.tilesSeen = Data.get("tilesSeen");
		this.goalTiles = data.goalTiles;
		this.goalText = data.goalText;
		this.pathsNeeded = data.pathsNeeded;
		this.caveTiles = data.caveTiles;
		this.goblinsVisible = 0;
		this.keysToWin = data.keysToWin;
		this._doorLocked = false;
		if (this.keysToWin > 0) {
			this._doorLocked = true;
		} 
		this.hearts = data.hearts;
		//this.gameID = ++gameID;
		this.won = false;
		this.lose = false;
		this.level = opts.level;
		this.levelNum = data.levelNumber;
		this.levelTotal = opts.levelTotal;
		this.startingRunes = data.startingRunes;
		this.backgroundImage = data.backgroundImage;
		this.gridWidth = data.gridWidth;
		this.gridHeight = data.gridHeight;
		
		this.drawBackgroundTiles();

		this._playerModel.setHearts(this.hearts);
		this._playerModel.updateGold();


		if (this._gameModel.isDaytime() === true) {
			//this._gui_frame.setImage(this.gui_day_img);
			this._gameStatusModel.setGameTime('day');
			this._minimumVisibleTiles = 5;
		} else {
			//this._gui_frame.setImage(this.gui_night_img);
			this._gameStatusModel.setGameTime('night');
			this._minimumVisibleTiles = 2;
		}

		// Display level introduction screen
		this.levelStartView.setup({levelNum: this.levelNum, goalText: this.goalText, goalTiles: this.goalTiles, specials: this._specials});
		this.addSubview(this.levelStartView);
		this.levelStartView.show();

		currentLayout = [];

		this._gameModel._runeGrid = [];

		this.tileDeck = this.level[0];

		this.tileGridPositions = [];

		// creates a randomized set of tile grid positions starting from 0 and going to gridWidth*gridHeight-1
		for (var i = 0;i < this.gridWidth * this.gridHeight;i++) {
			this.tileGridPositions.push(i);
		}
		this.tileGridPositions = Utility.shuffle(this.tileGridPositions);

		// Loads the Tile Deck in the game model with the tiles for the level
		this.tileDeck.forEach(bind(this,function(tileType) {

			this._gameModel.addTileToDeck(tileType);
		}))

		// iterates through the tile deck for the level and attaches a tileview to each tilemodel and places the tilemodel
		// into the currentLayout array using the tileNumber as the position in the array
		var pathNum = 1;
		while (this.tileGridPositions.length > 0) {
			
			var tileNumber = null;
			var tileModel = this._gameModel.removeTopTileFromDeck();
			
			if (tileModel.getTileType() == "path") {
				tileModel._pathNum = pathNum;
				pathNum++; 
			}
			if (tileModel.getPositionRule() != null) {

				tileNumber = this.resolvePositionRule(tileModel, currentLayout);

				if (tileNumber != null) {
					var index = this.tileGridPositions.indexOf(tileNumber);
					this.tileGridPositions.splice(index,1);
				} else {
					tileNumber = this.tileGridPositions.pop();
				}
			} else {
				tileNumber = this.tileGridPositions.pop();
			}

			if (tileNumber != null) {

				if (tileModel.getTileType() == 'goblin') {
					this._gameStatusModel.addGoblin();
				}

				tileModel.setTileNumber(tileNumber);

				this.addTileView(tileNumber, tileModel);

				currentLayout[tileNumber] = tileModel;
			}
		}

		// Load Starting Runes
		this.runeDeck = this.level[1];
		for(var i = 0;i< this.startingRunes;i++) {
			this.addRune(this.runeDeck[i]);
		}

		this.checkHintTileStates();
	};

	this.addRune = function(runeType) {

			var runeModel = new RuneModel( 
			{
				game: this,
				runeType: runeType
			});

			var runeView = this.runeViewPool.obtainView();

			runeView.style.zIndex = 5;
			runeView._runeType = runeType;
			runeView.setRuneImage(runeType);
			runeView.style.visible = true;
			runeModel.
				on('Update', bind(runeView, 'onUpdate')).
				on('Remove', bind(runeView, 'onRemove'));

			runeModel.placeRune();
	}

	this.addTileView = function(tileNumber, tileModel) {
		var tileView = this.tileViewPool.obtainView();

		tileView._tileNumber = tileNumber;
		tileView._tileType = tileModel.getTileType();
		tileView._tileModel = tileModel;
		tileView._setTilePosition();
		tileView.setup();

		tileModel.
			on('Update', bind(tileView, 'onUpdate')).
			on('UpdateImage', bind(tileView, 'onUpdateImage')).
			on('Reset', bind(tileView, 'onReset')).
			on('RemoveView', bind(tileView, 'onRemoveView')).
			on('UpdateTileType', bind(tileView, 'onUpdateTileType')).
			on('MoveToTile', bind(tileView, 'onMoveToTile')).
			on('Wake', bind(tileView, 'onWake')).
			on('Reveal', bind(tileView, 'onReveal')).
			on('Activate', bind(tileView, 'onActivate')).
			on('SetGlow', bind(tileView, 'onSetGlow'));

		this.addSubview(tileView);
	}

	this.getCreaturesInLayout = function(visible) {
		var creatures = [];
		currentLayout.forEach(function(tile) {
			if (visible != null) {
				if (tile._creature == true && tile._visible == visible) {
					creatures.push(tile);
				}
			} else {
				if (tile._creature == true) {
					creatures.push(tile);
				}
			}
		})

		return creatures;
	}

	this.checkGameStatus = function() {
		if (this.won || this.lose) {
			this.publish('end');
			if (this.won) {
				animate(this).wait(1000)
				.then(bind(this, function() {
					this.parent.end("win", {goldFound: this.goldFound, message: "", specialsFound: this.specialsFound});
				}));
				
			} else if (this.lose) {
				this.parent.end("loss", {goldFound: 0, message: this.loseMessage, specialsFound: this.specialsFound});
			}
		}
	};

	this.peekActive = function(active) {
		this._peekActive = active;
	}

	this.isPeekActive = function() {
		return this._peekActive;
	}

	// enter multiselect mode
	// create and display a new view overlaying the tile grid
	// display confirm and cancel buttons
	// on inputselect, determine the row, and display selection graphic on the row
	// cancel button - remove the overlay view, cancel and confirm buttons
	// confirm button - remove the overlay view, cancel and confirm buttons and process
	// the tile grid with the ability of the companion
	this.multiSelectMode = function(tile) {

		if (this._multiSelectActive == true) {
			return;
		} else {
			this._multiSelectActive = true;
		}

		this.multiSelectView = new View({
			superview: this,
			clip: true,
			x: 0,
			y: 0,
			width: 730,
			height: 576
		});

		this.activeCompanionTile = tile;

		this.multiSelectCancelBtn = new ImageView({
			parent: this,
			x: 845,
			y: 112,
			width: 100,
			height: 70,
			image: "resources/images/buttons/orange_button.png",
			zIndex: 1
		});
		this.multiSelectCancelBtnText = new TextView({
			parent: this.multiSelectCancelBtn,
			x: 0,
			y: 0,
			width: 100,
			height: 70,
			text: "Cancel",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});

		this.multiSelectConfirmBtn = new ImageView({
			parent: this,
			x: 845,
			y: 212,
			width: 100,
			height: 70,
			image: "resources/images/buttons/orange_button.png",
			zIndex: 1
		});
		this.multiSelectConfirmBtnText = new TextView({
			parent: this.multiSelectConfirmBtn,
			x: 0,
			y: 0,
			width: 100,
			height: 70,
			text: "Confirm",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});

		this.multiSelectCancelBtn.onInputSelect = bind(this, 'multiSelectCancel');
		this.multiSelectConfirmBtn.onInputSelect = bind(this, 'multiSelectConfirm');
		this.multiSelectView.onInputSelect = bind(this, 'multiSelect');

	}

	this.multiSelectCancel = function() {
		this.removeSubview(this.multiSelectView);
		this.removeSubview(this.multiSelectConfirmBtn);
		this.removeSubview(this.multiSelectCancelBtn);
		if (this.selectionBorder) {
			this.removeSubview(this.selectionBorder);
		}
		this._multiSelectActive = false;
	}

	this.multiSelectConfirm = function() {
		this.removeSubview(this.multiSelectView);
		this.removeSubview(this.multiSelectConfirmBtn);
		this.removeSubview(this.multiSelectCancelBtn);
		if (this.selectionBorder) {
			this.removeSubview(this.selectionBorder);
		}

		if (this.activeCompanionTile.getTileType() == 'dog') {
			this.findBones(this.activeRow);
		}
		this._multiSelectActive = false;
	}

	this.multiSelect = function(event,point) {
		this.activeRow = Math.floor(point.y / gameConstants.TILE_SIZE);
		this.activeCol = Math.floor(point.x / gameConstants.TILE_SIZE);

		if (this.selectionBorder) {
			this.removeSubview(this.selectionBorder);
		}

		this.selectionBorder = new ImageView({
			parent: this,
			x: 0 + gameConstants.TILE_X_OFFSET,
			y: gameConstants.TILE_SIZE * this.activeRow + gameConstants.TILE_Y_OFFSET,
			width: gameConstants.TILE_SIZE * this.gridWidth + 20,
			height: gameConstants.TILE_SIZE,
			sourceSlices: { horizontal: {left: 30, center: 54, right: 30},
					vertical: {top: 30, middle: 54, bottom: 30}
				},
			image: "resources/images/selectionBorder.png",
			zIndex: 1
		});
		//alert('multiselect x: ' + point.x + ', y: ' + point.y + ', row: ' + row + ', col: ' + col);
	}

	this.findBones = function(row) {

		for(var i = row * this.gridWidth; i < row * this.gridWidth + this.gridWidth;i++) {
			if (currentLayout[i].bones > 0) {
				if(currentLayout[i].isVisible() == false) {
					currentLayout[i].emit('Reveal');
				}
			}
		}
		//alert('findbones: ' + row);
	}

	this.resetAllTiles = function() {
		for (var i = 0;i < currentLayout.length;i++) {
			if (currentLayout[i].isVisible() == true) {
				currentLayout[i].resetTile();
			}
		}
	}

	this.resetNonStayVisibleTiles = function() {
		for (var i = 0;i < currentLayout.length;i++) {
			if (currentLayout[i].isVisible() == true && currentLayout[i].getStayVisible() == false) {
				currentLayout[i].resetTile();
			}
		}
	}

	this.replaceTile = function(tile) {
		if (tile.getTileType() == 'goblin') {
			this._gameStatusModel.removeGoblin();
		}
		var newTileModel = this._gameModel.removeTopTileFromDeck();
		newTileModel.setTileNumber(tile.getTileNumber());	
		currentLayout[tile.getTileNumber()] = newTileModel;

		tile.removeView();
		this.addTileView(tile.getTileNumber(), newTileModel);
	}

	this.swapTile = function(tileToRemove, tileToAdd, activateTile) {
		if (tileToRemove.getTileType() == 'goblin') {
			this._gameStatusModel.removeGoblin();
		}
		
		tileToAdd.setTileNumber(tileToRemove.getTileNumber());	
		currentLayout[tileToRemove.getTileNumber()] = tileToAdd;

		tileToRemove.removeView();
		this.addTileView(tileToRemove.getTileNumber(), tileToAdd);	

		if (activateTile == true) {
			tileToAdd.emit('Activate');
		}
	}

	this.getAllTileWithRule = function(rule) {
		var tiles = [];

		currentLayout.forEach(function(tile) {
			if (tile.isVisible() == true && tile[rule] == true) {
				tiles.push(tile);
			}
		})
		return tiles;
	}

	this.checkGoblinsVisible = function() {
		if (this._gameModel.getVisibleGoblins() >= 3) {
			this.lose = true;
			this.loseMessage = "Captured by goblins!";
		}
	}

	this.setGoalActive = function(tiles) {
		this._goalActive = true;

		tiles.forEach(bind(this, function(tile) {
			tile.setGlow(true);
			if (tile.getTileType() == 'door' && this.keysToWin == 0) {
				tile.updateImage('door_open');
			}
		}))
	}

	this.unlockDoor = function(doorTile) {
		//animate(this).now(bind(this, function() {
			this._doorLocked = false;
			doorTile.updateImage('door_open');
		//}))
		//.wait(600);
	}

	this.isGoalActive = function() {
		return this._goalActive;
	}
	
	this.checkToActivateGoal = function() {
		var goals = this.goalTiles.slice(0);
		var tiles = [];

		for (var i = 0;i < currentLayout.length;i++) {
			if (currentLayout[i].isVisible() == true) {
				for (var j = 0; j < goals.length;j++) {
					if (currentLayout[i].getTileType() === goals[j]) {
						goals.splice(j, 1);
						tiles.push(currentLayout[i]);
						break;
					}
				}
			}
		}
		if (goals.length == 0) {
			this.setGoalActive(tiles);
			//return true;
		}
		// else {
			//this.goalTiles = goals;
			//return false;
		//}
	}

	this.checkForGoal = function(doorTile) {
		//var goals = this.goalTiles;
		var keyCount = 0;
		//var goalCount = 0;
		//var pathCount = 0;

		for (var i = 0;i < currentLayout.length;i++) {
			if (currentLayout[i].isVisible() == true) {
				//if (currentLayout[i].getTileType() == goals[0]) {
				//	goalCount++;
				//}
				if (currentLayout[i].getTileType() == 'key') {
					keyCount++;
				}
				//if (currentLayout[i].getTileType() == 'path') {
				//	pathCount++;
				//}
			}
		} 
		if (keyCount >= this.keysToWin) {
		// && pathCount >= this.pathsNeeded) {
			if (this._doorLocked == true) {
				this.unlockDoor(doorTile);
			} else {

				var specialTiles = this.getTilesWithProperty('_isSpecial', true);
				if (specialTiles.length > 0) {
					specialTiles.forEach(bind(this, function(tile) {
						var newSpecial = true;

						this._specials.forEach(bind(this, function(special) {
							if (special == tile.getTileType()) {
								newSpecial = false;
							}
						}))
						if (newSpecial == true) {
							this._specials.push(tile.getTileType());
							this.specialsFound.push(tile.getTileType());	
						}
					}))
					Data.set("specials", this._specials);
				}

				this.won = true;
				this.goldFound = this.tallyGold();
			}
		} else {
			this.infoView.setDialog("You require " + this.keysToWin + " key(s) to unlock the traveler's portal");
			//this.infoView.style.visible = true;
			//this.addSubview(this.infoView);
			this.infoView.show();
		}
	}

	this.getDoorImage = function() {
		var keys = this.keysToWin;

		switch (keys)
		{
			case 0:
				return 'door_nokey';
			break;
			case 1:
				return 'door_1key';
			break;
			case 2:
				return 'door_2key';
			break;
			case 3:
				return 'door_3key';
			break;
		}
		return 'door_nokey';
	}

	this.addNewSpecial = function() {

	}

	this.tallyGold = function() {
		var goldCount = 0;
		currentLayout.forEach(bind(this, function(tile) {
			if (tile.isVisible() == true) {
				if (tile.getTileType() == 'goldcoin') {
					goldCount++;
					this.emitPlusGoldParticles(tile,1);
				} else if (tile.getTileType() == 'goldbag') {
					goldCount = goldCount + 10;
					this.emitPlusGoldParticles(tile,10);
				}
			}
		}))
		if (goldCount > 0) {
			var gold = Data.get("gold") || 0;
			gold = gold + goldCount;
			Data.setItem("gold", gold);
		}
		return goldCount;
	}

	this.emitPlusGoldParticles = function(tile,amount) {

		var particleObjects = this.particleEngine.obtainParticleArray(1);
		for (var i = 0; i < 1; i++) {
		  var pObj = particleObjects[i];
		  //pObj.dx = 40;
		  pObj.dy = -30;
		  pObj.x = this.getXCoordinate(tile.getTileNumber()) + 75;
		  pObj.y = this.getYCoordinate(tile.getTileNumber()) - 5;
		  pObj.ddy = -40;
		  pObj.width = 70;
		  pObj.height = 30;
		  pObj.image = 'resources/images/plus' + amount + 'gold.png';
		}

		this.particleEngine.emitParticles(particleObjects);
	}

	this.getXCoordinate = function(tileNumber) {
		var col = tileNumber % gameConstants.TILE_GRID_WIDTH;
		return gameConstants.TILE_X_OFFSET + col * 114;
	}

	this.getYCoordinate = function(tileNumber) {
		var row = Math.floor(tileNumber / gameConstants.TILE_GRID_WIDTH);
		return gameConstants.TILE_Y_OFFSET + row * 114;
	}

	this.updateTileVisibility = function() {
		currentLayout.forEach(bind(this,function(tile) {
			var activationDecay = tile.getActivationDecay();
			if (tile.isVisible() == true) {
				if (activationDecay > this._minimumVisibleTiles) {
					if (tile.getStayVisible() == false) {
						tile.resetTile();	
					}
					
				} else {
					tile.setActivationDecay(activationDecay + 1);
				}
			}

		}))
	}

	this.checkHintTileStates = function() {

		currentLayout.forEach(bind(this,function(tile) {
			if (tile.getTileType() == 'rock') {
				var dangerousCount = 0;
				// check 8 surrounding tiles for dangerous tiles and swap with appropriate rock image
				var tiles = this.getSurroundingTiles(tile);
				tiles.forEach(function(t) {
					if (t._dangerous == true) {
						dangerousCount++;
					}
				})
				if (dangerousCount == 1) {
					//tile.changeImage('rock_1bone');
					tile.updateImage('rock_1bone');
					tile.bones = 1;
				} else if (dangerousCount == 2) {
					//tile.changeImage('rock_2bones');
					tile.updateImage('rock_2bones');
					tile.bones = 2;
				} else if (dangerousCount >= 3) {
					//tile.changeImage('rock_3bones');
					tile.updateImage('rock_3bones');
					tile.bones = 3
				}
			}
		}))
	}

	this.locked = function() {
		return this._locked;
	};

	this.lock = function() {
		this._locked = true;
		GC.app.view.getInput().blockEvents = true;
	};

	this.unlock = function() {
		this._locked = false;
		GC.app.view.getInput().blockEvents = false;
	};

	this.drawBackgroundTiles = function() {

		var bgtile_img = new Image({url: "resources/images/" + this.backgroundImage +".png"});
		
		for (var tileNumber=0;tileNumber < 30;tileNumber++) {
			
			var backgroundView = this.backgroundImageViewPool.obtainView();
			row = Math.floor(tileNumber / this.gridWidth);
			col = tileNumber % this.gridWidth;

			backgroundView.updateOpts({
			    x: gameConstants.TILE_X_OFFSET + col * backgroundView.style.width,
			    y: gameConstants.TILE_Y_OFFSET + row * (backgroundView.style.height),
			    visible: true
			});

			backgroundView.setImage(bgtile_img);
			backgroundView.style.visible = true;
			this.addSubview(backgroundView);	
			this.backgroundTileLayout[tileNumber] = backgroundView;
		}
	}

	this.getRowTiles = function(row) {
		var rowArray = [];

		for(var i = row * this.gridWidth - this.gridWidth; i < row * this.gridWidth;i++) {
			rowArray.push(currentLayout[i]);
		}

		return rowArray;
	}

	this.getColumnTiles = function(col) {
		var colArray = [];

		for (var i = col; i <= this.gridWidth * (this.gridHeight-1) + col; i = i + this.gridWidth) {
			colArray.push(currentLayout[i]);
		}

		return colArray;
	}

	this.getTileRow = function(tileNumber) {
		var rowTiles = [];

		// top row is row 1
		var row = Math.floor(tileNumber / this.gridWidth) + 1;

		for(var i = row * this.gridWidth - this.gridWidth; i < row * this.gridWidth;i++) {
			rowTiles.push(currentLayout[i]);
		}

		return rowTiles;
	}

	this.getTileCol = function(tileNumber) {
		var colTiles = [];

		var col = tileNumber % this.gridWidth;

		for (var i = col; i <= this.gridWidth * (this.gridHeight-1) + col; i = i + this.gridWidth) {
			colTiles.push(currentLayout[i]);
		}

		return colTiles;
	}

	this.shuffleRow = function(tile) {
		// check if key in the same row
		var row = Math.floor(tile.getTileNumber() / this.gridWidth) + 1;

		for(var i = row * this.gridWidth - this.gridWidth; i < row * this.gridWidth;i++) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile._shuffleTrigger) {
				animate(tile).wait(1000)
				.now(bind(this, function () {
					if (tile._shuffleInitiator == true) {
						tile.setTileNumber(i);
					} else {
						currentLayout[i].setTileNumber(tile.getTileNumber());
					}
				}))
				.wait(600)
				.then(bind(this, function () {
					tile.resetTile();
					currentLayout[i].resetTile();
				}))
				.wait(500)
				.then(bind(this, function () {
					// mix up all tiles in the row and set face down
					var rowTileArray = []; 
					rowTileArray = this.getRowTiles(row);

					rowTileArray = Utility.shuffle(rowTileArray);
					for(var tileNumber = row * this.gridWidth - this.gridWidth; tileNumber < row * this.gridWidth;tileNumber++) {
						var newtile = rowTileArray.pop();
						newtile.resetTile();
						newtile.setTileNumber(tileNumber);
						currentLayout[tileNumber] = newtile;
					}	
				}))
				return true;
			}
		}
		return false;
	}

	this.shuffleColumn = function(tile) {
		var col = tile.getTileNumber() % this.gridWidth;

		for (var i = col; i <= this.gridWidth * (this.gridHeight-1) + col; i = i + this.gridWidth) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile._shuffleTrigger) {
				animate(tile).wait(1000)
				.now(bind(this, function () {
					if (tile._shuffleInitiator == true) {
						tile.setTileNumber(i);
					} else {
						currentLayout[i].setTileNumber(tile.getTileNumber());
					}
				}))
				.wait(600)
				.then(bind(this, function () {
					tile.resetTile();
					currentLayout[i].resetTile();
				}))
				.wait(500)
				.then(bind(this, function () {
					// mix up all tiles in the column and set face down
					var colArray = []
					colArray = this.getColumnTiles(col);

					colArray = Utility.shuffle(colArray);
					for (var tileNumber = col; tileNumber <= this.gridWidth * (this.gridHeight-1) + col; tileNumber = tileNumber + this.gridWidth) {
						var newtile = colArray.pop();
						newtile.resetTile();
						newtile.setTileNumber(tileNumber);
						currentLayout[tileNumber] = newtile;
					}
				}))
				return true;
			}
		}
		return false;
	}

	this.getSurroundingTiles = function(tile) {
		var tiles = [];
		var tileNumber = tile.getTileNumber();

		// right tile
		if ((tileNumber + 1) % this.gridWidth  != 0) {
			tiles.push(currentLayout[tileNumber+1]);
		}
		// left tile
		if (tileNumber > 0 && tileNumber % this.gridWidth != 0) {
			tiles.push(currentLayout[tileNumber-1]);
		}
		// top tile
		if (tileNumber >= this.gridWidth) {
			tiles.push(currentLayout[tileNumber - this.gridWidth]);
			// top right tile
			if ((tileNumber + 1) % this.gridWidth  != 0) {
				tiles.push(currentLayout[tileNumber - this.gridWidth + 1]);
			}
			// top left tile
			if (tileNumber > 0 && tileNumber % this.gridWidth != 0) {
				tiles.push(currentLayout[tileNumber - this.gridWidth - 1]);
			}
		}
		// bottom tile
		if (tileNumber < currentLayout.length - this.gridWidth) {
			tiles.push(currentLayout[tileNumber + this.gridWidth]);
			// bottom right tile
			if ((tileNumber + 1) % this.gridWidth != 0) {
				tiles.push(currentLayout[tileNumber + this.gridWidth + 1]);
			}
			// bottom left tile
			if (tileNumber > 0 && tileNumber % this.gridWidth != 0) {
				tiles.push(currentLayout[tileNumber + this.gridWidth - 1]);
			}
		}
		return tiles;
	}

	this.scrambleAdjacentTiles = function(tile) {
		var tileNumber = tile.getTileNumber();
		var tempTiles = [];

		// center tile
		var centerTile = currentLayout[tileNumber];
		centerTile.resetTile();
		tempTiles.push(centerTile);

		// right tile
		if ((tileNumber + 1) % this.gridWidth  != 0) {
			currentLayout[tileNumber + 1].resetTile();
			tempTiles.push(currentLayout[tileNumber+1])			
		}
		// left tile
		if (tileNumber > 0 && tileNumber % this.gridWidth != 0) {
			currentLayout[tileNumber - 1].resetTile();
			tempTiles.push(currentLayout[tileNumber-1])
		}
		// top tile
		if (tileNumber >= this.gridWidth) {
			currentLayout[tileNumber - this.gridWidth].resetTile();
			tempTiles.push(currentLayout[tileNumber - this.gridWidth])			
		}
		// bottom tile
		if (tileNumber < currentLayout.length - this.gridWidth) {
			currentLayout[tileNumber + this.gridWidth].resetTile();
			tempTiles.push(currentLayout[tileNumber + this.gridWidth])
		}

		tempTiles = Utility.shuffle(tempTiles);

		var centerTile = tempTiles.pop();
		centerTile.setTileNumber(tileNumber);
		currentLayout[tileNumber] = centerTile;

		if ((tileNumber + 1) % this.gridWidth != 0) {
			var rightTile = tempTiles.pop();
			rightTile.setTileNumber(tileNumber + 1);
			currentLayout[tileNumber + 1] = rightTile;			
		}
		if (tileNumber > 0 && tileNumber % this.gridWidth != 0) {
			var leftTile = tempTiles.pop();
			leftTile.setTileNumber(tileNumber - 1);
			currentLayout[tileNumber - 1] = leftTile;
		}

		if (tileNumber >= this.gridWidth) {
			var topTile = tempTiles.pop();
			topTile.setTileNumber(tileNumber - this.gridWidth);
			currentLayout[tileNumber - this.gridWidth] = topTile;
		}

		if (tileNumber < currentLayout.length - this.gridWidth) {
			var bottomTile = tempTiles.pop();
			bottomTile.setTileNumber(tileNumber + this.gridWidth);
			currentLayout[tileNumber + this.gridWidth] = bottomTile;
		}
	}

	//  Tile Placement - based on tile rules
	//    a. Need adjacent tile
	//		 - search already placed tiles for required tile type
	//		 - if found, check if adjacent tile is empty, if empty swap current position with empty position, if not then check 
	//			next adjacent position. If no adjacent empty tiles, continue search for another tile. If no required tiles are found
	//			then build a new tile list and start tile placement over.
	//	  b. Need to be on the board edge
	//		 - Search for empty position in 1st Row /Any Col, Last Row/Any Col, First Col/Any Row, Last Col/Any Row
	//		 - swap current position for empty position
	//    c. Different Column/Row
	//		 - Check all cells in the same row and column for specific tile type
	//		 - If tile type is found then get a new position
	//		 - If no positions left then start tile placement over
	//       - If tile type is not found then place tile 	
	this.resolvePositionRule = function(tile, currentLayout) {

		var tileNumber = null;
		var tileChoices = []; 

		if(tile.getTileType() == 'path' && tile._pathNum == 1) {
			tile._adjacentTile = 'door';
		}

		if (tile._adjacent === true) {
			for (var i=0;i<currentLayout.length;i++) {
				if (currentLayout[i] != null && currentLayout[i]._disabled == false  && currentLayout[i].getTileType() == tile._adjacentTile) {
					
					//check tile above
					if (i > this.gridWidth-1 && currentLayout[i - 6] == null) {
						tileNumber = i-6;
						tileChoices.push(tileNumber);
					}
					//check tile below
					if (i < currentLayout.length - 1 - this.gridWidth && currentLayout[i+6] == null) {
						tileNumber = i + 6;
						tileChoices.push(tileNumber);
					} 
					//check tile to right	
					if ((i + 1) % this.gridWidth  != 0 && currentLayout[i+1] == null ) {
						tileNumber = i + 1;
						tileChoices.push(tileNumber);
					}
					//check tile to left	
					if (i > 0 && i % this.gridWidth != 0 && currentLayout[i-1] == null) {
						tileNumber = i - 1;
						tileChoices.push(tileNumber);
					} 
				}
				//if (tileNumber !== null) break;
			}
		}
		if (tile._diagonal === true) {
			for (var i=0;i<currentLayout.length;i++) {
				if (currentLayout[i] != null && currentLayout[i]._disabled == false  && currentLayout[i].getTileType() == tile._adjacentTile) {
					
					//check tile above and to the left
					if (i > this.gridWidth && i % this.gridWidth != 0 && currentLayout[i - 7] == null) {
						tileNumber = i-7;
						tileChoices.push(tileNumber);
					}
					//check tile above and to the right
					if (i > this.gridWidth-1 && (i + 1) % this.gridWidth  != 0 && currentLayout[i - 5] == null) {
						tileNumber = i-5;
						tileChoices.push(tileNumber);
					}
					//check tile below and to the left
					if (i < currentLayout.length - 1 - this.gridWidth && i % this.gridWidth != 0 && currentLayout[i+5] == null) {
						tileNumber = i + 5;
						tileChoices.push(tileNumber);
					} 
					//check tile below and to the right
					if (i < currentLayout.length - 1 - this.gridWidth && (i + 1) % this.gridWidth != 0 && currentLayout[i+7] == null) {
						tileNumber = i + 7;
						tileChoices.push(tileNumber);
					} 
				}
			}
		}
		if (tile._notAdjacent === true) {
			for (var i=0;i<currentLayout.length;i++) {
				var placeTile = true;
				if (currentLayout[i] == null) {
					//check tile above and to the left
					if (currentLayout[i-7] != null) {
						if (i > this.gridWidth && i % this.gridWidth != 0 && currentLayout[i - 7].getTileType() == tile._notAdjacentTile) {
							placeTile = false;
						}
					}
					//check tile above and to the right
					if (currentLayout[i-5] != null) {
						if (i > this.gridWidth-1 && (i + 1) % this.gridWidth  != 0 && currentLayout[i - 5].getTileType() == tile._notAdjacentTile) {
							placeTile = false;
						}
					}
					//check tile below and to the left
					if (currentLayout[i+5] != null) {
						if (i < currentLayout.length - 1 - this.gridWidth && i % this.gridWidth != 0 && currentLayout[i+5].getTileType() == tile._notAdjacentTile) {
							placeTile = false;
						}
					} 
					//check tile below and to the right
					if (currentLayout[i+7] != null) {
						if (i < currentLayout.length - 1 - this.gridWidth && (i + 1) % this.gridWidth != 0 && currentLayout[i+7].getTileType() == tile._notAdjacentTile) {
							placeTile = false;
						}	 
					}
					//check tile above
					if (i > this.gridWidth-1 && currentLayout[i-6] != null && currentLayout[i - 6].getTileType() == tile._notAdjacentTile) {
						placeTile = false;
					}
					//check tile below
					if (i < currentLayout.length - 1 - this.gridWidth && currentLayout[i+6] != null && currentLayout[i+6].getTileType() == tile._notAdjacentTile) {
						placeTile = false;
					}
					//check tile to right	
					if ((i + 1) % this.gridWidth  != 0 && currentLayout[i+1] != null && currentLayout[i+1].getTileType() == tile._notAdjacentTile ) {
						placeTile = false;
					}
					//check tile to left	
					if (i > 0 && i % this.gridWidth != 0 && currentLayout[i-1] != null && currentLayout[i-1].getTileType() == tile._notAdjacentTile) {
						placeTile = false;
					} 
					if (placeTile == true) {
						tileNumber = i;
						tileChoices.push(tileNumber);
						break;
					}
				}
			}
		}

		if (tile._edge === true) {
			var length = currentLayout.length;
			for (var i=0;i<this.gridWidth;i++) {
				if (currentLayout[i] != null && currentLayout[i]._disabled == false) {
					tileNumber = i;
					tileChoices.push(tileNumber);
					break;
				} else if (!currentLayout[length-i]) {
					tileNumber = length-i;
					tileChoices.push(tileNumber);
					break;
				}
			}
			for (var i = 1;i<length/this.gridWidth-1;i++) {
				if (!currentLayout[i*this.gridWidth]) {
					tileNumber = i*this.gridWidth;
					tileChoices.push(tileNumber);
					break;
				} else if (!currentLayout[(i+1)*this.gridWidth-1]) {
					tileNumber = (i+1)*this.gridWidth-1;
					tileChoices.push(tileNumber);
					break;
				}
			}

			var positions = [];
			for (var i =0;i< this.gridWidth;i++) {
				positions.push(i);
			}
		}
		if (tileChoices.length > 0) {
			tileChoices = Utility.shuffle(tileChoices);
		}
		
		return tileChoices[0];
	}

	this.getUpperLeft = function() {
		if (i > this.gridWidth && i % this.gridWidth != 0 && currentLayout[i - 7] == null) {

		}
	}

	this.tick = function(dt) {
		this.particleEngine.runTick(dt);
	}
});

function sendTileToDrawPile(tile, gameScreen) {
	gameScreen._gameModel.addTileToDeck(tile);
	gameScreen._gameModel.shuffleDeck();
}

/*
function goblinEatsBerries(berryTile, gameScreen) {
	var goblins = [];

	currentLayout.forEach(function(tile) {
		if (tile.getTileType() == 'goblin' && tile.isVisible() == true) {
			goblins.push(tile);
		}
	})
	if (goblins.length > 0) {
		var whichGoblin = Math.floor(Math.random()*goblins.length);
		var tileToDiscard = goblins[whichGoblin];
		//var originalX = tileToDiscard.style.x;
		//var originalY = tileToDiscard.style.y;
		var newTile = replaceTile(tileToDiscard, gameScreen);
		var newTile2 = replaceTile(berryTile, gameScreen);
		
		animate(tileToDiscard).wait(500).now({x: berryTile.style.x,y: berryTile.style.y}, 700, animate.easeIn)
			.then({opacity: 0},500, animate.easeIn)
			.then(bind(this, function () {
				animate(berryTile).now({opacity:0},500, animate.easeIn);
			}))
			.then(bind(this, function () {

				tileToDiscard.resetTile();
				//newTile.setTileNumber(tileToDiscard.tileNumber);
				//newTile.style.x = originalX;
				//newTile.style.y = originalY;
				gameScreen.removeSubview(tileToDiscard);
				gameScreen.addSubview(newTile);
				//currentLayout[newTile.tileNumber] = newTile;

				//tileToDiscard = berryTile;
				berryTile.resetTile();
				//newTile2.setTileNumber(tileToDiscard.tileNumber);
				//newTile2.style.x = tileToDiscard.style.x;
				//newTile2.style.y = tileToDiscard.style.y;
				gameScreen.removeSubview(berryTile);
				gameScreen.addSubview(newTile2);
				//currentLayout[newTile2.tileNumber] = newTile2;
			} ));
		return true
	}
	return false;
}*/

/*
function processSteal(tileToDiscard, tileToSendToDrawPile, gameScreen) {

		var newTile = replaceTile(tileToSendToDrawPile, gameScreen);
		var newTile2 = replaceTile(tileToDiscard, gameScreen);

		animate(tileToSendToDrawPile)
			.wait(500)
			.then({x: tileToDiscard.style.x, y: tileToDiscard.style.y}, 500, animate.easeIn)
			.then({opacity: 0}, 500)
			.then(bind(this, function() {
				tileToSendToDrawPile.resetTile();
				gameScreen.removeSubview(tileToSendToDrawPile);
				gameScreen.addSubview(newTile);

			}))

		animate(tileToDiscard)
		.wait(500)
		.then({opacity: 0}, 1000)
		.then(bind(this, function() {

			gameScreen.removeSubview(tileToDiscard);
			gameScreen.addSubview(newTile2);

		}))
		var newGoblin = new Tile('goblin');
		bindExploreToTile(newGoblin, gameScreen);
		gameScreen._gameModel.addTileToDeck(newGoblin);
		gameScreen._gameModel.shuffleDeck();
}*/

function stealInColumn(tile, gameScreen) {
	var col = tile.tileNumber % this.gridWidth;
	var tileToDiscard;
	var tileToSendToDrawPile;

	for (var i = col; i <= this.gridWidth * (this.gridHeight-1) + col; i= i+this.gridWidth) {
		if (tile.getTileType() == tile.tileToSteal) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile.stealingTile) {
				tileToDiscard = tile;
				tileToSendToDrawPile = currentLayout[i];
				break;
			}
		} else if (tile.getTileType() == tile.stealingTile) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile.tileToSteal) {
				tileToDiscard = currentLayout[i];
				tileToSendToDrawPile = tile;
				break;
			}
		}
	}

	if (tileToDiscard != null && tileToSendToDrawPile != null) {

		processSteal(tileToDiscard, tileToSendToDrawPile, gameScreen);

		return true;
	}
	return false;
}

function stealInRow(tile, gameScreen) {
	var row = Math.floor(tile.style.tileNumber / this.gridWidth) + 1;
	var tileToDiscard;
	var tileToSendToDrawPile;

	for(var i = row * this.gridWidth - this.gridWidth; i < row * this.gridWidth;i++) {
		if (tile.getTileType() == tile.tileToSteal) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile.stealingTile) {
				tileToDiscard = tile;
				tileToSendToDrawPile = currentLayout[i];
				break;
			}
		} else if (tile.getTileType() == tile.stealingTile) {
			if(currentLayout[i].isVisible() == true && currentLayout[i].getTileType() == tile.tileToSteal) {
				tileToDiscard = currentLayout[i];
				tileToSendToDrawPile = tile;
				break;
			}
		}
	}
	
	if (tileToDiscard != null && tileToSendToDrawPile != null) {

		processSteal(tileToDiscard, tileToSendToDrawPile, gameScreen);

		return true;
	}
	return false;
}

function animateToDestination(tile, x, y) {
	animate(tile).now({x: x, y: y}, 500, animate.easeIn);
}


