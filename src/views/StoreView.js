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

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		supr(this, 'init', arguments);

		this.canHandleEvents(true);

		this.game = opts.game;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 20,
			y: 20,
			width: 785,
			height: gameConstants.GAME_HEIGHT - 40,
			title: 'Store',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;

		var align = itemStyle.ALIGN;

		var testImage = new ImageView({
			superview: this._dialogView,
			x: 50,
			y: 100,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			image: "resources/images/gametiles/life_potion.png"
		});

		var itemName = new TextView({
			superview: this._dialogView,
			x: 170,
			y: 80,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Life Potion",
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'left'
		});

		var itemDescription = new TextView({
			superview: this._dialogView,
			x: 170,
			y: 120,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Temporarily adds one heart",
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'left'
		});

		this.lifepotionBuyButton = new BoxBorderView({
			superview: this._dialogView,
			x: 600,
			y: 100,
			width: 114,
			height: 114,
			image: itemStyle.BACKGROUND,
			text: "1",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center',
			cost: 1
		});

	
		var exitButton = new BoxBorderView({
			superview: this._dialogView,
			x: 340,
			y: 400,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Leave store",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		/*this.gold = new ImageView({
			parent: this._dialogView,
			x: 20,
			y: height - 100,
			width: 60,
			height: 60,
			image: 'resources/images/gold.png'
		});

		this.goldTotalText = new TextView({
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

		this.lifepotionBuyButton.on('InputSelect', bind(this, function () {
			var currentGold = Data.getItem("gold");
			var cost  = this.lifepotionBuyButton._opts.cost
			if (currentGold >= cost) {
				// Add life potion to inventory
				// if add to inventory successful - decrement gold and update gold count text
				if (this.game._playerModel.addToInventory('life_potion') == true) {
					Data.setItem("gold", currentGold - cost);
					//this.goldTotalText.setText(currentGold - cost);
					this.game._playerModel.updateGold();					
				} else {
					alert('inventory full');
				}
				
			} else {
				//Data.setItem("gold", 500);
				alert('Not enough gold to purchase this item');
			}
					
		}));

		exitButton.on('InputSelect', bind(this, function () {
			menu.hide();
		}));

	};
});