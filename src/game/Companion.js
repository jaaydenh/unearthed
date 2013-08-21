import animate;
import ui.View;
import ui.ImageView;
import ui.SpriteView as SpriteView;
import ui.resource.Image as Image;

exports = Class(ui.View, function (supr) {

	this.init = function (tileType,opts) {

		opts = merge(opts, {
			width:	85,
			height: 85
		});
		this.tileType = tileType;
		this.tile_img = new Image({url: "resources/images/gametiles/" + this.tileType + ".png"});

		supr(this, 'init', [opts]);

		this.build();
	};

	this.build = function () {

		this._inputview = new ui.View({
			superview: this,
			clip: true,
			x: 0,
			y: 0,
			width: 85,
			height: 85
		});

		this._tileview = new ui.ImageView({
			superview: this._inputview,
			image: this.tile_img,
			x: 0,
			y: 0,
			width: 85,
			height: 85
		});

		this._animator = animate(this._tileview);

		this._inputview.on('InputSelect', bind(this, function () {

			//this.emit('companionSelect');
			this.getSuperview().multiSelectMode(this);
	
		}));
	};
});
