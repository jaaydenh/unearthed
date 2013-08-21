import animate;
import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;

var default_img;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			width:	gameConstants.INVENTORY_ITEM_SIZE,
			height: gameConstants.INVENTORY_ITEM_SIZE
		});
		//this._playerView = opts.playerView;
		this._playerModel = opts.playerModel;
		this._itemType = opts.itemType;
		this._invPosition = opts.invPosition;

		supr(this, 'init', [opts]);
		this.itemImg = new Image({url: "resources/images/gametiles/" + this._itemType + ".png"});
		this.build();	
	};

	this.build = function () {

		this._inputView = new ui.View({
			superview: this,
			clip: true,
			x: 0,
			y: 0,
			width: gameConstants.INVENTORY_ITEM_SIZE,
			height: gameConstants.INVENTORY_ITEM_SIZE,
			zIndex: 50
		});

		this._itemView = new ui.ImageView({
			superview: this._inputView,
			image: this.itemImg,
			x: 0,
			y: 0,
			width: gameConstants.INVENTORY_ITEM_SIZE,
			height: gameConstants.INVENTORY_ITEM_SIZE
		});

		this._inputView.on('InputSelect', bind(this, function () {
			this._playerModel.addHeart();
			this._playerModel.removeInventory(this._invPosition);
			this.getSuperview().removeSubview(this);	
		}));
	};


});
