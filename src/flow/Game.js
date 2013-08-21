import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import src.game.GameView as GameView;
import src.config.levels as levels;
import src.util.Data as Data;

exports = Class(View, function (supr) {

	var BG_WIDTH = 1024,
		BG_HEIGHT = 576;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;
		opts.zIndex = 2;

		this.flow = opts.parent;
		this.previousLevel = null;
		this.world = null;

		supr(this, 'init', arguments);
	};

	this.buildView = function() {
		this.flow.removeSubview(this);

		this.curtain = new ImageView({
			parent: this,
			x: 0,
			y: -BG_HEIGHT,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/newb-ville.png"
		});

		this.setWorld("forest");
	};

	this.setWorld = function(world, cb) {
		//var level = Data.getItem('worlds')[world].last + 1;
		this.world = world;

		this.curtain.setImage("resources/images/backgrounds/" + world + ".png");

		if (typeof cb === "function") {
			cb();
		}
	};

	this.start = function(opts) {
		//var name = opts.name = Data.getItem("worlds")[this.world].last + 1;
		//	level;
		var worlds = Data.getItem("worlds"),
			lvls = worlds[this.world];

		var levelIndex, level;

		var levelNumber;

		if (opts.tile) {
			levelNumber = opts.tile.id;
		} else {
			levelNumber = lvls.currentLevel
		}

		levelIndex = opts.levelIndex = levelNumber - 1;	

		lvls.currentLevel = levelNumber;

		Data.setItem("worlds", worlds);

		// else {
		//	name = opts.name = Data.getItem("worlds")[this.world].last + 1;
		//}

		opts.worldLevels = levels[this.world];

		level = opts.worldLevels[levelIndex].map(function(list) {
			return merge([], list);
		});

		opts.level = level;
		this.launchLevel(opts);

		if (typeof opts.cb === 'function') {
			opts.cb();
		}
	};

	this.launchLevel = function(opts) {
		var levelIndex = opts.levelIndex,
			level = opts.level,
			i, len;

		level[0].name = levelIndex;

		var data = merge({}, level[0]);
		opts = merge(opts, {
			parent: this,
			level: level,
			levelNum: opts.levelIndex,
			levelTotal: opts.worldLevels.length,
			opacity: 0,
			visible: false
		});

		// create new game or reset the game view
		if (!this.game) {
			this.game = new GameView(opts);
		} else {
			this.addSubview(this.game);
			this.game.resetView(opts);
			this.game.style.opacity = 0;
		}

		this.inView = this.game;

		data.level = this.world + ':' + opts.levelIndex;

		this.previousLevel = merge([], level);
		this.previousLevel.unshift(data);


		// map Infinity to -1 to prepare for serializing
		/*for (i = 1, len = this.previousLevel.length; i < len; i++) {
			this.previousLevel[i] = this.previousLevel[i].map(function (blob) {
				return blob === Infinity ? -1 : blob;
			});
		}*/

		this.startTime = (new Date()).getTime();
	};

	this.end = function(status, goldFound, message) {
		var worlds = Data.getItem("worlds"),
			lvls = worlds[this.world],
			lives;

		if (status === "abort") {
			this.flow.change("game", "worlds");
		} else if (status === "map") {
			this.flow.change("game", "map");
		} else {
			var beat = false;
			if (status === "win") {

				if (lvls.unlocked < levels[this.world].length) {
					if (parseInt(lvls.currentLevel, 10) + 1 > lvls.unlocked) {
						lvls.unlocked = parseInt(lvls.currentLevel, 10) + 1;
						this.flow.unlockLevels(lvls.unlocked);
					}
				}

				//this.flow.setLevelPosition(lvls.unlocked, lvls.currentLevel);


				Data.setItem("worlds", worlds);

				/*if (lvls.currentLevel === levels[this.world].length) {
					beat = true;
				}

				if (lvls.last < levels[this.world].length - 1) {
					lvls.last++;
					lvls.unlocked = Math.max(lvls.last + 1, lvls.unlocked);

					this.flow.unlockLevels(lvls.unlocked);
				} else if (lvls.last === levels[this.world].length - 1) {
					beat = true;
					//lvls.last = -1;
				}*/			
			} 

			if (status === 'loss') {
				lives = Data.getItem('lives') || 5;
				Data.setItem('lives', lives > 0 ? lives-- : 5);
			}

			this.flow.change("game", status === "win" ? "win" : "lose", { worldwin: beat, goldFound: goldFound, message: message });
		}
	};

	this.enterTransition = function(cb) {
		this.curtain.style.y = -BG_HEIGHT;
		animate(this.curtain)
		.now({ y: 0 }, 500, animate.easeOut)
		.then(bind(this, function() {
			this.inView.style.visible = true;

			// fade in game
			animate(this.inView)
			.now({ opacity: 1 }).then(bind(this, function() {
				if (typeof cb === 'function') {
					cb();
				}
			}));
		}));
	};

	this.close = function() {
		this.flow.removeSubview(this);
		this.game.cleanup();
		this.removeSubview(this.game);
	};

	this.loadingScreen = function() {
		var worldsView = this.flow.worlds;
		worldsView.setLoadingAnimation({
			hideHeader: true,
			hideOthers: true
		});
		this.flow.addSubview(worldsView);
	};

	this.hideLoadingScreen = function() {
		this.flow.removeSubview(this.flow.worlds);
		this.flow.worlds.removeLoadingAnimation();	
	};
});
