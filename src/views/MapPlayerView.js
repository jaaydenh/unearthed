import ui.View as View;
import ui.ImageView as ImageView;

import adventuremap.views.tiles.status.NodeItemView as NodeItemView;

exports = Class(NodeItemView, function (supr) {
	this.init = function (opts) {
		supr(this, 'init', [opts]);

		this.style.width = 200;
		this.style.height = 200;

		this.offsetY = -200;

		this._content = new View({
			superview: this,
			x: -50,
			y: -50,
			width: 300,
			height: 300
		});

		new ImageView({
			superview: this._content,
			x: 60,
			y: 60,
			width: 180,
			height: 180,
			image: 'resources/images/gc96.png'
		});
		new ImageView({
			superview: this._content,
			x: 0,
			y: 0,
			width: 300,
			height: 300,
			image: 'resources/images/roundEdged.png'
		});
	};

	this.update = function (tile) {
		this._dt = 0;
		this.style.visible = true;
	};

	this.tick = function (dt) {
		if (this.style.visible) {
			this._dt += dt;
			this._content.style.y = Math.sin(this._dt * 0.002) * 50 - 50;
		}
	};
});