import animate;
import ui.resource.Image as Image;
import ui.View as View;
import ui.TextView as TextView;
import ui.ImageView as ImageView;
import menus.constants.menuConstants as menuConstants;
import menus.views.components.BoxBorderView as BoxBorderView;
import menus.views.components.BoxDialogView as BoxDialogView;
import menus.views.components.DialogBackgroundView as DialogBackgroundView;
import src.constants.gameConstants as gameConstants;
import src.util.Data as Data;

exports = Class(DialogBackgroundView, function (supr) {
	this.init = function (opts) {

		supr(this, 'init', arguments);

		this.style.visible = false;

		this.canHandleEvents(true);

		//this._gameView = opts.gameView;

		this._dialogView = new BoxDialogView({
			superview: this._dialogContainerView,
			x: 20,
			y: 20,
			width: gameConstants.GAME_WIDTH - 20,
			height: gameConstants.GAME_HEIGHT - 20,
			title: 'Quests',
			closeCB: opts.closeCB ? bind(this, 'hide', opts.closeCB) : false,
			backCB: opts.backCB ? bind(this, 'hide', opts.backCB) : false
		});

		var itemStyle = menuConstants.MENU_ITEM;
		var textStyle = menuConstants.MENU_TEXT;
		var menu = this;

		this.quest1FindTileObjective = new ImageView({
			superview: this._dialogView,
			x: 50,
			y: 85,
			width: 80,
			height: 80,
			image: "resources/images/gametiles/tree.png",
			visible: true
		});

		this.quest1Text = new TextView({
			superview: this._dialogView,
			x: 150,
			y: 80,
			width: 800,
			height: 100,
			image: itemStyle.BACKGROUND,			
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
		}));
	};

	this.setDialog = function(message) {
		//this.dialogText.setText(message);
	}

	this.updateQuests = function() {
		this.quests = Data.get("quests");

		var quest1 = this.quests[0];

		this.quest1Text.setText(quest1._description);

		this.tile_img = new Image({url: "resources/images/gametiles/" + quest1._findTileObjective + ".png"});

		this.quest1FindTileObjective.setImage(this.tile_img);
	}
});