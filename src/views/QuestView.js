import ui.widget.Toast as Toast;
import animate;
import ui.View;
import ui.ImageView;
import ui.SpriteView as SpriteView;
import ui.resource.Image as Image;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		this.tile_img = new Image({url: "resources/images/gametiles/cat.png"});
		this.border_img = new Image({url: "resources/images/ui/contentBorder.png"});
		supr(this, 'init', [opts]);

		this.build();
	};

	this.getTileType = function() {
		return this._tileType;
	}

	this.build = function () {

		this.questInfo = new Toast({
		    superview: this,
		    position: 'top',
		    images: {
		        top: 'resources/images/toast/top.png'
		    }
		});

	};
});
