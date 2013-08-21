import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.TextView as TextView;
import src.config.levels as levels;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;

exports = Class(View, function(supr) {

	var BG_WIDTH = 1024,
		BG_HEIGHT = 576,
		MARGINS = 50;

	this.init = function(opts) {
		opts.x = MARGINS;
		opts.y = MARGINS;
		opts.width = BG_WIDTH - MARGINS * 2;
		opts.height = BG_HEIGHT;
		this.game = opts.game;
		this.wait = 0;
		this.winIndicator = 0;
		opts.clip = true;
		this.difficulty = opts.difficulty;
		this.touched = false;
		this.animating = false;

		supr(this, "init", [opts]);

		this.designView();
		this.startMiniGame();
	};

	this.designView = function() {

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,	
			clip: true,
			width: BG_WIDTH - MARGINS * 2,
			height: BG_WIDTH - MARGINS * 11,
			image: "resources/images/backgrounds/win.png"
		});

		this.instructionsText = new TextView({
			parent: this,
			x: 65,
			y: 0,
			width: 800,
			height: 80,
			text: "Think quick to escape the goblin trap!!!",
			fontFamily: "LuckiestGuyRegular",
			size: 82,
			strokeColor: 'white',
			strokeWidth: 2,
			canHandleEvents: false
		});

		this.escapeText = new TextView({
			parent: this,
			x: 670,
			y: 350,
			width: 200,
			height: 50,
			text: "Escaped",
			fontFamily: "LuckiestGuyRegular",
			size: 50,
			strokeColor: 'green',
			strokeWidth: 8,
			canHandleEvents: false
		});

		this.captureText = new TextView({
			parent: this,
			x: 50,
			y: 350,
			width: 200,
			height: 50,
			text: "Captured",
			fontFamily: "LuckiestGuyRegular",
			size: 50,
			strokeColor: 'red',
			strokeWidth: 8,
			canHandleEvents: false
		});

		this.stickman = new ImageView({
			parent: this,
			x: 444,
			y: 325,
			width: 40,
			height: 103,
			opacity: 1,
			image: "resources/images/stickman.png"
		});

		this.winloseindicator = new ImageView({
			parent: this,
			x: 285,
			y: 324,
			width: 360,
			height: 120,
			opacity: 1,
			image: "resources/images/winLoseIndicator.png"
		});

		this._keyinputview = new View({
			superview: this,
			//clip: true,
			y: BG_HEIGHT,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE
		});

		this.key = new ImageView({
			parent: this._keyinputview,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			//opacity: 0,
			image: "resources/images/gametiles/key.png"
		});

		this._trapinputview = new View({
			superview: this,
			//clip: true,
			y: BG_HEIGHT,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex:100
		});

		this.trap = new ImageView({
			parent: this._trapinputview,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			//opacity: 0,
			image: "resources/images/gametiles/trap.png",
			zIndex:100
		});

		this._goblininputview = new View({
			superview: this,
			//clip: true,
			y: BG_HEIGHT,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex:100
		});

		this.goblin = new ImageView({
			parent: this._goblininputview,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			//opacity: 0,
			image: "resources/images/gametiles/goblin.png",
			zIndex:100
		});

		this._ogreinputview = new View({
			superview: this,
			//clip: true,
			y: BG_HEIGHT,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			zIndex:100
		});

		this.ogre = new ImageView({
			parent: this._ogreinputview,
			width: gameConstants.TILE_SIZE,
			height: gameConstants.TILE_SIZE,
			//opacity: 0,
			image: "resources/images/gametiles/ogre.png",
			zIndex:100
		});

		this._keyinputview.on('InputSelect', bind(this, function () {
			this.animating = true;
			this.winIndicator++;
			this.touched = true;
			var x = this.stickman.style.x + 54;
			animate(this._keyinputview).now({x:900,y:400,scale:0.1}, 400);
			animate(this.stickman).now({x: x})
			.then(bind(this, function () {
				this.checkResults();
				this.animating = false;
			}))
		}));

		this._trapinputview.on('InputSelect', bind(this, function () {
			this.animating = true;
			this.winIndicator--;
			this.touched = true;
			//this.stickman.style.x -= 54;
			var x = this.stickman.style.x - 54;
			animate(this._trapinputview).now({x:200,y:400,scale:0.1}, 400);
			animate(this.stickman).now({x: x})
			.then(bind(this, function () {
				this.checkResults();
				this.animating = false;
			}))
		}));

		this._goblininputview.on('InputSelect', bind(this, function () {
			this.animating = true;
			this.winIndicator--;
			this.touched = true;
			var x = this.stickman.style.x - 54;
			animate(this._goblininputview).now({x:200,y:400,scale:0.1}, 400);
			animate(this.stickman).now({x: x})
			.then(bind(this, function () {
				this.checkResults();
				this.animating = false;
			}))
		}));

		this._ogreinputview.on('InputSelect', bind(this, function () {
			this.animating = true;
			this.winIndicator--;
			this.touched = true;
			var x = this.stickman.style.x - 54;
			animate(this._ogreinputview).now({x:200,y:400,scale:0.1}, 400);
			animate(this.stickman).now({x: x})
			.then(bind(this, function () {
				this.checkResults();
				this.animating = false;
			}))
		}));
	};

	this.checkResults = function() {
		if (this.winIndicator == 3) {
			animate(this.escapeText).now({scale:1.2})
			.wait(500)
			.then(bind(this, function () {
				this.game.removeSubview(this);
			}))

		} else if (this.winIndicator == -3) {
			animate(this.captureText).now({scale:1.2})
			.wait(500)
			.then(bind(this, function () {
				this.game.removeSubview(this);
				var loseMessage = "Captured in a trap!";
				this.game.parent.end("loss", 0, loseMessage);
			}))			
		}
	}

	this.startMiniGame = function() {
		var oldTile;

		if (this.tileset) {
			if (this.tileset.length > 0) {
				oldTile = this.tileset[0];
			}
		}
		
		this.tileset = ["_keyinputview","_trapinputview","_goblininputview","_ogreinputview"];

		while (oldTile == this.tileset[0]) {
			this.tileset = shuffle(this.tileset);
		}

		if (this.difficulty == 1) {

			if (oldTile == "_keyinputview" && this.touched == false) {
				this.winIndicator--;
				var x = this.stickman.style.x - 54;
				animate(this.stickman).now({x: x})
				.then(bind(this, function () {
					this.checkResults();
				}))
			}
			if (oldTile) {
				this.removeSubview(this[oldTile]);
			}
			this.touched = false;
			this[this.tileset[0]].style.x = 400;
			this[this.tileset[0]].style.y = 170;
			this[this.tileset[0]].style.opacity = 1;
			this.addSubview(this[this.tileset[0]]);
		} else if (this.difficulty == 2) {
			this.removeSubview(this[this.tileset[0]]);
			this.removeSubview(this[this.tileset[1]]);
			this.removeSubview(this[this.tileset[2]]);
			this.removeSubview(this[this.tileset[3]]);

			this[this.tileset[0]].style.x = 200;
			this[this.tileset[0]].style.y = 170;
			this[this.tileset[0]].style.opacity = 1;
			this[this.tileset[0]].style.scale = 1;
			this[this.tileset[0]].style.width = gameConstants.TILE_SIZE;
			this[this.tileset[0]].style.height = gameConstants.TILE_SIZE;
			this.addSubview(this[this.tileset[0]]);
			
			this[this.tileset[1]].style.x = 400;
			this[this.tileset[1]].style.y = 170;
			this[this.tileset[1]].style.opacity = 1;
			this[this.tileset[1]].style.scale = 1;
			this[this.tileset[0]].style.width = gameConstants.TILE_SIZE;
			this[this.tileset[0]].style.height = gameConstants.TILE_SIZE;
			this.addSubview(this[this.tileset[1]]);

			this[this.tileset[2]].style.x = 600;
			this[this.tileset[2]].style.y = 170;
			this[this.tileset[2]].style.opacity = 1;
			this[this.tileset[2]].style.scale = 1;
			this[this.tileset[0]].style.width = gameConstants.TILE_SIZE;
			this[this.tileset[0]].style.height = gameConstants.TILE_SIZE;
			this.addSubview(this[this.tileset[2]]);
		}
	}

	function shuffle(array) {
	    var tmp, current, top = array.length;

	    if(top) while(--top) {
	    	current = Math.floor(Math.random() * (top + 1));
	    	tmp = array[current];
	    	array[current] = array[top];
	    	array[top] = tmp;
	    }

	    return array;
	}

	this.tick = function(dt) {
		this.wait += dt;
		if (this.wait > 500 && this.animating == false) {
			this.startMiniGame();
			this.wait = 0;	
		}
		
	};
});
