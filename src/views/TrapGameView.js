import animate;

import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;

import menus.constants.menuConstants as menuConstants;

import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;

import src.constants.gameConstants as gameConstants;
import device;
import src.util.Data as Data;
import ui.ViewPool as ViewPool;
import ui.resource.Image as Image;
import src.views.TrapTileView as TrapTileView;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		supr(this, 'init', arguments);

		this.canHandleEvents(true);

		this.game = opts.game;
		this.gameStart = false;
		this.wait = 0;
		this.tileHit = false;
		this.winIndicator = 0;
		this.state = '';
		this.animating = false;
		this.processing = false;
		
		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 20,
			y: 20,
			width: gameConstants.GAME_WIDTH - 40,
			height: gameConstants.GAME_HEIGHT - 40,
			title: 'TRAP!!!',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;

		this.settingsArray = [];

		var goblin = {state: 'evil', image: new Image({url: "resources/images/gametiles/goblin.png"})};
		var key = {state: 'good', image: new Image({url: "resources/images/gametiles/key.png"})};
		var ogre = {state: 'evil', image: new Image({url: "resources/images/gametiles/ogre.png"})};
		var goldcoin = {state: 'good',image: new Image({url: "resources/images/gametiles/goldcoin.png"})};
		var whitegoblin = {state: 'good', image: new Image({url: "resources/images/gametiles/whitegoblin.png"})};
		var evilgoldcoin = {state: 'evil',image: new Image({url: "resources/images/gametiles/evilgoldcoin.png"})};

		this.settingsArray.push(goblin);
		this.settingsArray.push(key);
		this.settingsArray.push(ogre);
		this.settingsArray.push(goldcoin);
		this.settingsArray.push(evilgoldcoin);
		this.settingsArray.push(whitegoblin);

        this.tileViewPool = new ViewPool({
            ctor: TrapTileView,
            initCount: 5,
            initOpts: {
            	//superview: this,
            	parent: this      
            }
        });

		this.instructionsText = new TextView({
			superview: this._dialogView,
			x: 70,
			y: 80,
			width: 800,
			height: 250,
			image: itemStyle.BACKGROUND,
			text: "How to escape the trap, 1. Select good tiles keys, gold and white goblins 2. If you miss selecting a good item then you will move closer to being captured. 3. Avoid selecting evil things (green goblins, ogres, green coins)",
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'left'
		});

		this.startButton = new BoxBorderView({
			superview: this._dialogView,
			x: 340,
			y: 300,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Start",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		this.startButton.on('InputSelect', bind(this, function () {
			this.startButton.style.visible = false;
			this.instructionsText.style.visible = false;
			this.escapeText.style.visible = true;
			this.captureText.style.visible = true;
			this.winloseindicator.style.visible = true;
			this.stickman.style.visible = true;
			this.gameStart = true;
			this.build();
		}));

		this.escapeText = new TextView({
			parent: this._dialogView,
			x: 700,
			y: 350,
			width: 200,
			height: 50,
			text: "Escaped",
			fontFamily: "LuckiestGuyRegular",
			size: 50,
			strokeColor: 'green',
			strokeWidth: 8,
			canHandleEvents: false,
			zIndex:100,
			visible: false
		});

		this.captureText = new TextView({
			parent: this._dialogView,
			x: 70,
			y: 350,
			width: 200,
			height: 50,
			text: "Captured",
			fontFamily: "LuckiestGuyRegular",
			size: 50,
			strokeColor: 'red',
			strokeWidth: 8,
			canHandleEvents: false,
			zIndex:100,
			visible: false
		});

		this.stickman = new ImageView({
			parent: this._dialogView,
			x: 464,
			y: 325,
			width: 40,
			height: 103,
			opacity: 1,
			image: "resources/images/stickman.png",
			zIndex: 100,
			visible: false
		});

		this.winloseindicator = new ImageView({
			parent: this._dialogView,
			x: 305,
			y: 324,
			width: 360,
			height: 120,
			opacity: 1,
			image: "resources/images/winLoseIndicator.png",
			zIndex: 100,
			visible: false
		});
	};

	this.build = function() {
		//this.currentTrapTile = this.tileViewPool.obtainView();
		this.currentTrapTile = new ImageView({
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			image: "resources/images/gametiles/tree.png"
		})

		this.currentTrapTile.style.x = 430;
		this.currentTrapTile.style.y = 150;
		var settingsNum = Math.floor(Math.random() * this.settingsArray.length);
		
		this.currentTrapTile.on('InputSelect', bind(this, function () {
			//alert('tile selected');
			this.tileHit = true;
		}));

		this.currentTrapTile.style.visible = true;
		this._dialogView.addSubview(this.currentTrapTile);

		this.currentSettings = this.settingsArray.splice(settingsNum, 1);
		this.currentTrapTile.setImage(this.currentSettings[0].image);
		//this.currentTrapTile.state = this.currentSettings[0].state;
		this.currentTrapTile.state = '';
	}

	this.animateActionResult = function(result) {
		var x = 0;
		this.animating = true;

		if (result == 'good') {
			x = this.stickman.style.x + 54;
		} else if (result == 'evil') {
			x = this.stickman.style.x - 54;	
		}
		
		//animate(this.currentTrapTile).now({x:200,y:400,scale:0.1}, 400);
		animate(this.stickman).now({x: x})
		.then(bind(this, function () {			
			this.animating = false;
		}))
	}

	this.checkResults = function() {
		if (this.winIndicator >= 3) {
			this.animating = true;
			animate(this.escapeText).now({scale:1.2})
			.wait(500)
			.then(bind(this, function () {				
				this.hide();
				this.game.removeSubview(this);
			}))

		} else if (this.winIndicator <= -3) {
			this.animating = true;
			animate(this.captureText).now({scale:1.2})
			.wait(500)
			.then(bind(this, function () {				
				this.hide();
				this.game.removeSubview(this);
				var loseMessage = "Captured in a trap!";
				this.game.parent.end("loss", 0, loseMessage);
			}))			
		} else {
			this.processing = false;
		}
	}

	this.tick = function(dt) {
		this.wait += dt;

		if (this.gameStart == true) {
			if (this.wait > 700 && this.processing == false) {
				this.processing = true;
				//if (this.currentTrapTile) {
				//	this.tileViewPool.releaseView(this.currentTrapTile);	
				//}

				if (this.tileHit == true) {
					if (this.currentTrapTile.state == 'evil') {
						this.animateActionResult('evil');	
						this.winIndicator--;
						this.checkResults();
					} else if (this.currentTrapTile.state == 'good') {
						this.animateActionResult('good');	
						this.winIndicator++;
						this.checkResults();
					}
					this.tileHit = false;
				} else {
					if (this.currentTrapTile.state == 'good') {
						this.animateActionResult('evil');	
						this.winIndicator--;
						this.checkResults();
					} else {
						this.processing = false;
					}

				}

				var settingsNum = Math.floor(Math.random() * this.settingsArray.length);
				
				this.settingsArray.push(this.currentSettings[0]);
				this.currentSettings = this.settingsArray.splice(settingsNum, 1);
				this.currentTrapTile.setImage(this.currentSettings[0].image);
				this.currentTrapTile.state = this.currentSettings[0].state;

				this.wait = 0;	
				
			}
		}
	};
});