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
import ui.resource.Image as Image;
import ui.ViewPool as ViewPool;
import src.views.DogItemView as DogItemView;
import src.views.RabbitItemView as RabbitItemView;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		//this.canHandleEvents(true);

		this._game = opts.game;
		this._levelNum = opts.levelNum;
		this._goalText = opts.goalText;
		this._goalTiles = opts.goalTiles;
		//this._specials = opts.specials;

		supr(this, 'init', arguments);

		this.style.visible = false;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 20,
			y: 10,
			width: gameConstants.GAME_WIDTH - 40,
			height: gameConstants.GAME_HEIGHT - 20,
			title: 'Level ' + this.levelNum,
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;

		var align = itemStyle.ALIGN;

        this.goalTileViewPool = new ViewPool({
            ctor: ImageView,
            initCount: 8,
            initOpts: {
            	//superview: this,
            	parent: this      
            }
        });

		/*var testImage = new ImageView({
			superview: this._dialogView,
			x: 50,
			y: 100,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			image: "resources/images/gametiles/life_potion.png"
		});*/

		this.goalText = new TextView({
			superview: this._dialogView,
			x: 70,
			y: 85,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: this._goalText,
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'center'
		});

		this.specialText = new TextView({
			superview: this._dialogView,
			x: 100,
			y: 270,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Select specials for this level",
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'center',
			visible: false
		});

		this.treasureText = new TextView({
			superview: this._dialogView,
			x: 700,
			y: 75,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Treasure Found",
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'left'
		});
	
		var playButton = new BoxBorderView({
			superview: this._dialogView,
			x: 240,
			y: 430,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Play",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		this.treasureImage = new ImageView({
			parent: this._dialogView,
			x: 740,
			y: 400,
			width: 135,
			height: 114,
			image: 'resources/images/goldpile.png'
		});

		this.treasureMeterImage = new ImageView({
			parent: this._dialogView,
			x: 750,
			y: 160,
			width: 114,
			height: 325,
			image: 'resources/images/treasure_meter.png',
			zIndex: -1
		});
		/*this.goldTotalText = new TextView({
			parent: this._dialogView,
			x: 65,
			y: height - 100,
			width: 100,
			height: 50,
			text: Data.getItem("gold"),
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeColor: 'gold',
			strokeWidth: 4.5,
			canHandleEvents: false
		});*/

		playButton.on('InputSelect', bind(this, function () {
			menu.hide();
			this.specialItems.forEach(bind(this, function(item) {
				if (item._selected == true) {
					var playerModel = this._game.getPlayerModel();
					if (playerModel.isItemInInventory(item._tileType) == false) {
						this._game._playerModel.addToInventory(item._tileType)						
					}
				}
			}))
		}));

	};

	this.setup = function(opts) {
		this.specialItems = [];
		this.goalTileViewPool.releaseAllViews();
		this._dialogView.title.setText('Level ' + opts.levelNum);
		//this._dialogView.updateOpts({
		//	title: 'sfdsfsdds ' + opts.levelNum
		//})
		this.goalText.setText(opts.goalText);

		var goalTiles = opts.goalTiles;
		var specials = opts.specials;

		for (var i =0;i<goalTiles.length;i++) {
			var tile = this.goalTileViewPool.obtainView();
			var imageType = goalTiles[i];

			tile.style.x = i * gameConstants.TILE_SIZE + 400 - (goalTiles.length * 60);
			tile.style.y = 180;
			tile.style.width = 114;
			tile.style.height = 114;

			if (imageType == 'door') {
				imageType = this._game.getDoorImage();
			}

			var tileImage = new Image({url: "resources/images/gametiles/" + imageType + ".png"});
			tile.setImage(tileImage);
			tile.style.visible = true;
			this._dialogView.addSubview(tile);
		}

		if (specials.length > 0) {
			this.specialText.style.visible = true;
		}

		for (var i =0;i<specials.length;i++) {
			var special;
			if (specials[i] == 'dog') {
				special = new DogItemView({
					tileType: 'dog',
					levelStart: true
				});
			} else if (specials[i] == 'rabbit') {
				special = new RabbitItemView({
					tileType: 'rabbit',
					levelStart: true
				});
			}
			special.style.x = i * 80 + 400 - (specials.length * 60);
			special.style.y = 335;
			this.specialItems.push(special);
			this._dialogView.addSubview(special);
		}		
	}
});