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

		this._gameView = opts.gameView;

		supr(this, 'init', arguments);

		this.style.visible = false;

		this.canHandleEvents(true);
		this.choiceB_cb = null;
		this.choiceB_cb = null;
		//this.game = opts.game;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 20,
			y: 20,
			width: gameConstants.GAME_WIDTH - 40,
			height: gameConstants.GAME_HEIGHT - 40,
			title: 'Default',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;

		/*var testImage = new ImageView({
			superview: this._dialogView,
			x: 50,
			y: 100,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			image: "resources/images/gametiles/" + this._special + ".png",
			visible: false
		});*/

		this.dialogText = new TextView({
			superview: this._dialogView,
			x: 170,
			y: 80,
			width: 600,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: this._special,
			fontFamily: textStyle.FONT_FAMILY,
			size: textStyle.FONT_SIZE,
			padding: textStyle.PADDING,
			color: itemStyle.COLOR,
			strokeColor: textStyle.STROKE_COLOR,
			strokeWidth: textStyle.STROKE_WIDTH,
			wrap: true,
			horizontalAlign: 'left'
		});

		var choiceAButton = new BoxBorderView({
			superview: this._dialogView,
			x: 180,
			y: 400,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Choice A",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		var choiceBButton = new BoxBorderView({
			superview: this._dialogView,
			x: 500,
			y: 400,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Choice B",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		choiceAButton.on('InputSelect', bind(this, function () {
			menu.hide();
			 if (typeof this.choiceA_cb === "function") {
    			this.choiceA_cb();
   			}
		}));

		choiceBButton.on('InputSelect', bind(this, function () {
			menu.hide();
			if (typeof this.choiceB_cb === "function") {
    			this.choiceB_cb();
   			}
		}));
	};

	this.setChoices = function(choiceA_cb, choiceB_cb) {
		this.choiceA_cb = choiceA_cb;
		this.choiceB_cb = choiceB_cb;
	}

	this.setDialog = function(message) {
		this.dialogText.setText(message);
	}
});