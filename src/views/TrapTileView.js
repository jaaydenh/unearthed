import ui.View;
import ui.ImageView as ImageView;
import src.constants.gameConstants as gameConstants;

exports = Class(ui.View, function (supr) {
	this.init = function (opts) {
		
		this._trapGame = opts.parent;

		supr(this, 'init', [opts]);

		this._inputview = new ui.View({
			superview: this,
			clip: false,
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex: 9999999
		});

		this._tileview = new ImageView({
			superview: this._inputview,
			image: "resources/images/gametiles/tree.png",
			x: 0,
			y: 0,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE
		});

		this._inputview.on('InputSelect', bind(this, function () {

			alert('tile selected');
			this._trapGame.tileHit = true;
	
		}));
	}

	this.setImage = function(image) {
		this._tileview.setImage(image);
	}

	this.onObtain = function() {
        this.style.visible = true;
    };
});