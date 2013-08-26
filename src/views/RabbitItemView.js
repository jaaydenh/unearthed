import animate;
import ui.View;
import ui.ImageView;
import ui.SpriteView as SpriteView;
import ui.resource.Image as Image;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		this._selected = false;
		this._levelStart = opts.levelStart;
		this._game = opts.game;
		opts = merge(opts, {
			width:	85,
			height: 85
		});
		this._tileType = opts.tileType;
		this.tile_img = new Image({url: "resources/images/gametiles/rabbit.png"});
		this.border_img = new Image({url: "resources/images/ui/contentBorder.png"});
		supr(this, 'init', [opts]);

		this.build();
	};

	this.getTileType = function() {
		return this._tileType;
	}

	this.build = function () {

		this._inputview = new ui.View({
			superview: this,
			clip: false,
			x: 0,
			y: 0,
			width: 95,
			height: 95
		});

		this._borderview = new ui.ImageView({
			superview: this._inputview,
			image: this.border_img,
			x: 0,
			y: 0,
			width: 95,
			height: 95,
			visible: false
		});

		this._tileview = new ui.ImageView({
			superview: this._inputview,
			image: this.tile_img,
			x: 3,
			y: 3,
			width: 85,
			height: 85
		});

		this._animator = animate(this._tileview);

		this._inputview.on('InputSelect', bind(this, function () {

			if (this._levelStart == true) {
				if (this._selected == false) {
					this._selected = true;
					this._borderview.style.visible = true;
				} else {
					this._selected = false;
					this._borderview.style.visible = false;
				}
			} else {
				this._game.peekActive(true);	
			}
			
		}));
	};
});
