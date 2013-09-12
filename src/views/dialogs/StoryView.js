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

		this.parent = opts.parent;

		supr(this, 'init', arguments);

		this.style.visible = false;
		this.callback = null;
		//this.game = opts.game;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 10,
			y: 10,
			width: gameConstants.GAME_WIDTH - 20,
			height: gameConstants.GAME_HEIGHT - 20,
			title: 'The beginning',
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
			height: 300,
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

		var exitButton = new BoxBorderView({
			superview: this._dialogView,
			x: 340,
			y: 400,
			width: 300,
			height: 100,
			image: itemStyle.BACKGROUND,
			text: "Ok",
			fontFamily: itemStyle.FONT_FAMILY,
			fontSize: itemStyle.FONT_SIZE,
			textPadding: itemStyle.PADDING,
			textColor: itemStyle.COLOR,
			textOutline: itemStyle.STROKE_COLOR,
			strokeWidth: itemStyle.STROKE_WIDTH,
			horizontalAlign: itemStyle.ALIGN || 'center'
		});

		exitButton.on('InputSelect', bind(this, function () {
			menu.hide();

			if (typeof this.callback === "function") {
    			this.callback();
   			}
			//this.parent.showScreen("character");
		}));

	};

	this.setDialog = function(message) {
		this.dialogText.setText(message);
	}

	this.setCallback = function(callback) {
		this.callback = callback;
	}
});