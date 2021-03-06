import animate;
import ui.ImageView;
import ui.SpriteView as SpriteView;
import ui.resource.Image as Image;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;

var default_img;

exports = Class(SpriteView, function (supr) {

	this.init = function (opts) {

		opts = merge(
				opts,
				{
					url: 'resources/images/runes/rune',
					width: gameConstants.RUNE_SIZE,
					height: gameConstants.RUNE_SIZE,
					//defaultAnimation: 'default',
					frameRate: 16,
					/*sheetData: {
						  url: "resources/images/runes/fire.png", // spritesheet
						  width: 73, // animation frame width
						  height: 73, // animation frame height
						  //offsetX: 34, // horizontal space between frame images, including padding
						  //offsetY: 66, // vertical space between frame images, including padding
						  //startX: 10, // x coordinate of first frame on sheet
						  //startY: 0, // y coordinate of first frame on sheet
						  anims: {
						  //  normal:  [ [0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2] ] // xy indices of each frame in animation on spritesheet
						  	default: [[0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[7,0],[8,0]]	
						  }
						}*/
				}
			);

		this._game = opts.game;
		this._runeType = opts.runeType;
		this._runeNumber = -1;
		
		supr(this, 'init', [opts]);

		//if (this._runeType == '') {
		//	this._runeType = 'campfire';
		//}

		//this.rune_img = new Image({url: "resources/images/gametiles/" + this._runeType + ".png"});

		this.build();
		
		//this.startAnimation('run', {loop: true});
	};
	this.onRemoveView = function () {
		//this.removeFromSuperview();
		this._game.releaseView(this, 'rune');
	};
	this.onUpdate = function(runeNumber) {
		this._runeNumber = runeNumber;

		this._setRunePosition();
		this._game.addSubview(this);
		//animate(this._runeview).now({width: gameConstants.RUNE_SIZE, height: gameConstants.RUNE_SIZE}, 500, animate.easeOut);
		//animate(this._runeview).now({opacity: 1}, 1000, animate.easeOut);
	};
	this.setRuneImage = function(image) {
		//this._opts.url = 'resources/images/runes/' + image;
		//this.style._opts.url = 'resources/images/runes/' + image;
		//this.updateOpts({
		//	url: 'resources/images/runes/' + image
		//})
		//this.rune_img = new Image({url: "resources/images/" + image + ".png"});
		//this._runeview.setImage(this.rune_img);
	}

	this._setRunePosition = function() {
		var row,col;	
		row = Math.floor(this._runeNumber / (gameConstants.TILE_GRID_WIDTH - 1));
		col = this._runeNumber % (gameConstants.TILE_GRID_WIDTH - 1);
		this.style.x = gameConstants.TILE_X_OFFSET + col * gameConstants.TILE_SIZE + 84;
		this.style.y = gameConstants.TILE_Y_OFFSET + row * gameConstants.TILE_SIZE + 75;

		//this.startAnimation('default', {loop: true, randomFrame: true});
		this.startAnimation(this._runeType, {loop: true, randomFrame: true});
	};

	this.onReset = function () {
		animate(this).now({ opacity: 0 }, 100, animate.easeIn).then(bind(this, function () {
			
		})).then({ opacity: 1}, 300, animate.easeOut);
	};

	this.build = function () {

		/*this._runeview = new ui.ImageView({
			superview: this,
			image: this.rune_img,
			opacity:0,
			x: 0,
			y: 0,
			width: gameConstants.RUNE_SIZE,
			height: gameConstants.RUNE_SIZE,
			visible: false
		});*/

	};


});
