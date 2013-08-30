import animate;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import src.util.Data as Data;
import menus.views.MenuView as MenuView;
import src.constants.gameConstants as gameConstants;
import menus.constants.menuConstants as menuConstants;
import src.sounds.soundManager as soundManager;
import ui.ParticleEngine as ParticleEngine;

var default_img;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			width:	gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE
		});
		this.wait = 0;
		this._game = opts.game;
		//this._background = opts.background;
		this._tileNumber = opts.tileNumber;
		this._tileType = opts.tileType;
		this._tileModel = opts.tileModel;
		this._visible = false;

		supr(this, 'init', [opts]);

		this._defaultTileType = 'tree';
		this._tileType = '';

		this.build();
		//this._setTilePosition();
	};
	this.onObtain = function() {
        this.style.visible = true;
    };

    this.onRelease = function() {
        console.log(this._tileType + ' tile view released!');
    };
	this.onRemoveView = function () {
		this._game.releaseView(this, 'tile');
	};
	this.onUpdate = function(tileNumber) {
		this._tileNumber = tileNumber;

		animate(this).now({x: this.getXCoordinate(), y: this.getYCoordinate()}, 500, animate.easeOut);
	};
	this.onMoveToTile = function(opts) {
		this._tileNumber = opts.tileNum;
		animate(this).now({x: this.getXCoordinate(), y: this.getYCoordinate()}, 500, animate.easeOut)
		.then(bind(this, function() {
			if (opts.replaceTile == true) {
				this._tileModel.replaceTile();
			}
		}))

	}
	this.onWake = function() {
		animate(this._tileview).now({x: -5}, 40)
		.then({y:-5,x:10},40)
		.then({x:5,y:10},40)
		.then({x:-5,y:10},40)
		.then({y:-5},40)
		.then({x:0,y:0},40)
		.then(bind(this, function() {
			this.activateTile();
		}));
	}

	this.onActivate = function() {
		this._animator.now(bind(this, function() {
			this._tileview.setImage(this.tile_img);	
		}))
		.wait(400)
		.then(bind(this, function() {
			this.activateTile();
		}))
	}

	this.onUpdateImage = function(tileType) {
		this.tile_img = new Image({url: "resources/images/gametiles/" + tileType + ".png"});
		if (this._tileModel._visible == true) {
			this._tileview.setImage(this.tile_img);	
		}
	}
	this.tick = function(dt) {
		this.wait += dt;
		//if (this.pEngine) {
			//this.pEngine.emitParticles(particleObjects);
			if (this._tileModel.isSleeping() == true && this._tileModel._visible == true) {
				
				if (this.wait > 700) {
					this.emitSleepingZParticles();
					this.wait = 0;
				}
				//this._game.particleEngine.runTick(dt);
			}
		//}
	}

	this.onReveal = function() {
		var shift = ((gameConstants.TILE_SIZE*1.4)-gameConstants.TILE_SIZE)/2;
		
		this._animator.now({ opacity:0,zIndex:20}, 300, animate.easeIn).then(bind(this, function() {
			this._tileview.setImage(this.tile_img);	
		}))
		.then({opacity:1},50)
		.then({scale:1.5,x: -shift, y: -shift},200, animate.easeOut)
		.wait(30)
		.then({scale:1, x: 0, y: 0},100, animate.easeIn)
		.wait(50)
		.then(
			bind(this, function() {
			this._tileModel.setVisible(true);
		}));
	}

	this._showTile = function() {
		
		var peekActive = this._game.isPeekActive();

		if (this._game.locked()) {
			return false;
		} else {
			this._game.lock();
		}

		if (peekActive == false) {
			soundManager.play('step');	
		}
		
		var shift = ((gameConstants.TILE_SIZE*1.4)-gameConstants.TILE_SIZE)/2;
		
		this._animator.now({ opacity:0,zIndex:20}, 300, animate.easeIn).then(bind(this, function() {
			this._tileview.setImage(this.tile_img);	

		}))
		.then({opacity:1},50)
		.then({scale:1.5,x: -shift, y: -shift},200, animate.easeOut)
		.wait(30)
		.then({scale:1, x: 0, y: 0},100, animate.easeIn)
		.wait(50)
		.then(
			bind(this, function() {

				if (peekActive == false) {
					this.activateTile();
				} else {
					this._tileview.setImage(default_img);
					this._game.peekActive(false);
					this._game.unlock();
				}
			}
		));
	
	};
	this.activateTile = function() {
		this._tileModel.setVisible(true);
		this._tileModel.activateTile();
		this._tileModel.updateGame();
		this._game.unlock();
	};

	this.emitSleepingZParticles = function() {

		var particleObjects = this._game.particleEngine.obtainParticleArray(1);
		for (var i = 0; i < 1; i++) {
		  var pObj = particleObjects[i];
		  pObj.dx = 35;
		  pObj.dy = -10;
		  pObj.x = this.getXCoordinate() + 70;
		  pObj.y = this.getYCoordinate() + 10;
		  pObj.ddy = -40;
		  pObj.width = 10;
		  pObj.height = 10;
		  pObj.image = 'resources/images/z.png';
		}

		this._game.particleEngine.emitParticles(particleObjects);
	}

	this.getXCoordinate = function() {
		var col = this._tileNumber % gameConstants.TILE_GRID_WIDTH;
		return gameConstants.TILE_X_OFFSET + col * this.style.width;
	}

	this.getYCoordinate = function() {
		var row = Math.floor(this._tileNumber / gameConstants.TILE_GRID_WIDTH);
		return gameConstants.TILE_Y_OFFSET + row * this.style.height;
	}

	this._setTilePosition = function() {
		var row,col;	
		row = Math.floor(this._tileNumber / gameConstants.TILE_GRID_WIDTH);
		col = this._tileNumber % gameConstants.TILE_GRID_WIDTH;
		this.style.x = gameConstants.TILE_X_OFFSET + col * this.style.width;
		this.style.y = gameConstants.TILE_Y_OFFSET + row * this.style.height;
	};

	this.onUpdateTileType = function(tileType, wait) {
		this.tile_img = new Image({url: "resources/images/gametiles/" + tileType + ".png"});
		animate(this).wait(500)
		.then({opacity:0}, 300, animate.easeOut)
		.then(bind(this, function() {
			this._tileview.setImage(this.tile_img);	
		}))
		.then({opacity:1},500, animate.easeOut);
	}

	this.getTileType = function() {
		return _tileType;
	};

	this.onReset = function() {
		this._animator.now({ opacity: 0 }, 100, animate.easeIn).then(bind(this, function () {
			this._tileview.setImage(default_img);
		})).then({ opacity: 1}, 300, animate.easeOut);
	};

	this.setup = function() {
		this._tileview.setImage(default_img);
		this._glowview.style.visible = false;

		var tileImage = this._tileType;
		if (tileImage == 'door') {
			tileImage = this._game.getDoorImage();
		}

		this.tile_img = new Image({url: "resources/images/gametiles/" + tileImage + ".png"});

		this._tileInfoView = new MenuView({
			superview: this._game,
			modal: true,
			x: 20,
			y: 20,
			width: gameConstants.GAME_WIDTH - 40,
			height: gameConstants.GAME_HEIGHT - 40,
			title: this._tileType,
			items: [
				{image: 'resources/images/gametiles/' + tileImage + '.png', height: gameConstants.TILE_SIZE, width: gameConstants.TILE_SIZE, align: 'center'},
				{text: this._tileModel.getDescription()},
				{item: 'Ok', action: bind(this, '_showTile')}
			],
			showTransitionMethod: menuConstants.transitionMethod.FADE,
			showTransitionTime: 400,
			hideTransitionMethod: menuConstants.transitionMethod.FADE
		});
	}

	this.onSetGlow = function(visible) {
		this._glowview.style.visible = visible;
	}

	this.build = function () {

		if (this._tileType == 'disabled') {
			default_img = new Image({url: "resources/images/gametiles/tree_disabled.png"});
		} else {
			default_img = new Image({url: "resources/images/gametiles/" + this._defaultTileType + ".png"});
			//this.background_img = new Image({url: "resources/images/" + this._background + ".png"});
		}
		this.glow_img = new Image({url: "resources/images/gametiles/glow.png"});

		this._inputview = new ui.View({
			superview: this,
			clip: false,
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex: 50
		});

		this._tileview = new ui.ImageView({
			superview: this._inputview,
			image: default_img,
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex: 5
		});

		this._glowview = new ui.ImageView({
			superview: this._inputview,
			image: "resources/images/gametiles/glow.png",
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			visible: false,
			zIndex: 0
		});

		/*this._tileBackground = new ui.ImageView({
			superview: this,
			image: this.background_img,
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex:0
		})*/

		this._animator = animate(this._tileview);

		this._inputview.on('InputSelect', bind(this, function () {

			var isTileSeen = false;
			this._game.tilesSeen.forEach(bind(this, function(tileId) {
				if (tileId == this._tileModel._id) {
					isTileSeen = true;
				}
			}))

			if (isTileSeen == true) {
				this._showTile();
			} else {
				this._game.tilesSeen.push(this._tileModel._id);
				Data.set("tilesSeen", this._game.tilesSeen);
				this._tileInfoView.show();
			}
	
		}));
	};


});
