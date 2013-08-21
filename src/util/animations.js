import ui.resource.Image;

import src.util.Particle as Particle;

exports = {
	star: function (opts) {
		opts = merge(opts, {
			parent: GC.app.view,
			angle: undefined,
			rotate: false
		});
		
		var star = new Particle({
			parent: opts.parent,
			view: opts.parent,
			image: new ui.resource.Image({
				url: "resources/images/popups/glitter_spritesheet.png",
				sourceW: 171/3|0,
				sourceH: 171/3|0,
				sourceX: 171/3 * ~~(Math.random() * 3),
				sourceY: 171/3 * ~~(Math.random() * 3)	
			}),
			scale: opts.scale,
			width: 171 / 3,
			anchorX: 171 / 6,
			anchorY: 171 / 6,
			height: 171 / 3
		});
		
		star.placeRandomly();
		star.flyAndFade(opts);
		
		return this;
	},
	burst: function(opts) {
		[0, 60, 120, 180, 240, 300].forEach(function (angle) {
			this.star(merge({}, opts, { angle: angle / 180 * Math.PI }));
		}, this);
		
		return this;
	}
};
