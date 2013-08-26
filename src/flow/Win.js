import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.TextView as TextView;

import src.config.levels as levels;
import src.util.Data as Data;
import src.views.DiscoveryView as DiscoveryView;

/**
 * Win module
 */
exports = Class(View, function(supr) {

	var BG_WIDTH = 1024,
		BG_HEIGHT = 576,
		BLOB_Y = 50,
		BLOB_WIDTH = 108,
		BLOB_HEIGHT = 109,
		SUN_WIDTH = 450,
		SUN_HEIGHT = 450,
		WIN_Y = 180,
		WIN_WIDTH = 256,
		WIN_HEIGHT = 88,
		NEXT_WIDTH = 154,
		NEXT_HEIGHT = 64,
		MENU_WIDTH = 70,
		MENU_HEIGHT = 34,
		REPLAY_WIDTH = 82,
		REPLAY_HEIGHT = 34,
		MARGINS = 6,
		SUN_SPIN_RATE = Math.PI / 2,
		ANIM_TIME = 500;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;

		this.flow = opts.parent;
		this.worldwin = false;
		this.goldFound = 0;

		supr(this, "init", [opts]);

		this.designView();
	};

	this.designView = function() {
		this.flow.removeSubview(this);

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/win.png"
		});

		this.winSun = new ImageView({
			parent: this,
			x: (BG_WIDTH - SUN_WIDTH) / 2,
			y: BLOB_Y - (SUN_HEIGHT - BLOB_HEIGHT) / 2,
			anchorX: SUN_WIDTH / 2,
			anchorY: SUN_HEIGHT / 2,
			width: SUN_WIDTH,
			height: SUN_HEIGHT,
			opacity: 0,
			image: "resources/images/popups/win-sun.png"
		});

		this.goldCoin = new ImageView({
			parent: this,
			x: (BG_WIDTH - NEXT_WIDTH) / 2,
			y: BG_HEIGHT,
			width: 65,
			height: 65,
			image: "resources/images/gametiles/goldcoin.png"
		});

		this.goldFoundText = new TextView({
			parent: this,
			x: (BG_WIDTH - NEXT_WIDTH) / 2 + 50,
			y: BG_HEIGHT,
			width: 100,
			height: 50,
			text: "",
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeColor: 'gold',
			strokeWidth: 4.5,
			canHandleEvents: false
		});

		this.winText = new TextView({
			parent: this,
			x: BG_WIDTH,
			y: 60,
			width: WIN_WIDTH,
			height: WIN_HEIGHT,
			text: "You Escaped!",
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			strokeColor: 'white',
			strokeWidth: 3,
			canHandleEvents: false
		});

		this.nextButton = new ImageView({
			parent: this,
			x: (BG_WIDTH - NEXT_WIDTH) / 2,
			y: BG_HEIGHT,
			width: NEXT_WIDTH,
			height: NEXT_HEIGHT,
			image: "resources/images/buttons/red_button.png"
		});
		this.nextText = new TextView({
			parent: this.nextButton,
			x: 0,
			y: 0,
			width: NEXT_WIDTH,
			height: NEXT_HEIGHT,
			text: "Map",
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			strokeColor: 'white',
			strokeWidth: 3,
			canHandleEvents: false
		});
		this.nextButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			if (this.worldwin) {
				this.flow.change("win", "worldswin");
			} else {
				this.flow.change("win", "map");
			}
		});

		this.menuButton = new ImageView({
			parent: this,
			x: (BG_WIDTH / 2) - 200,
			y: BG_HEIGHT,
			width: MENU_WIDTH,
			height: MENU_HEIGHT,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuText = new TextView({
			parent: this.menuButton,
			x: 0,
			y: 0,
			width: MENU_WIDTH,
			height: MENU_HEIGHT,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});
		this.menuButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			this.flow.change("win", "worlds");
		});

		this.replayButton = new ImageView({
			parent: this,
			x: (BG_WIDTH / 2) + 140,
			y: BG_HEIGHT,
			width: REPLAY_WIDTH,
			height: REPLAY_HEIGHT,
			image: "resources/images/buttons/red_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayButton,
			x: 0,
			y: 0,
			width: REPLAY_WIDTH,
			height: REPLAY_HEIGHT,
			text: "Replay",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});
		this.replayButton.onInputSelect = bind(this, function() {
			var worlds = Data.getItem("worlds"),
				world = this.flow.game.world,
				levels = worlds[world];

			if (this.worldwin) {
				levels.last = levels[this.flow.game.world].length - 1;
			}

			levels.last--;
			Data.setItem("worlds", worlds);
			this.flow.change("win", "game");
		});

		this.manageViews();
	};

	this.manageViews = function() {};

	this.enterTransition = function() {
		this.winSun.style.r = 0;

		// move in win text
		animate(this.winText)
		.now({ x: (BG_WIDTH - WIN_WIDTH) / 2 })
		.then(bind(this, function() {
			// fade in sun
			animate(this.winSun).now({ opacity: 1 });
			this.sunActive = true;
		}));

		animate(this.nextButton).now({ y: 485 });
		animate(this.replayButton).now({ y: 490 });
		animate(this.menuButton).now({ y: 490 });
		animate(this.goldCoin).now({ y: 300 });
		animate(this.goldFoundText).now({ y: 300 });
	};

	this.leaveTransition = function(cb, opts) {
		this.sunActive = false;

		animate(this.winSun).now({ opacity: 0 });
		animate(this.winText).now({ dy: -300 });
		animate(this.nextButton).now({ dy: 300 });
		animate(this.menuButton).now({ dy: 300 });
		animate(this.replayButton).now({ dy: 300 });
		animate(this.goldCoin).now({ dy: 300 });
		animate(this.goldFoundText).now({ dy: 300 });

		if (opts != null && opts.fade === false) {
			setTimeout(cb, 500);
		} else {
			animate(this.background)
			.now({ opacity: 0 })
			.then(cb);
		}
	};

	this.showDiscoveryView = function() {
		this.discoveryView = new DiscoveryView({
			special: this.specialsFound[0]
		})
		this.addSubview(this.discoveryView);
		this.discoveryView.show();
	};

	this.resetView = function() {
		this.background.style.opacity = 1;
		this.nextButton.style.y = BG_HEIGHT;
		this.menuButton.style.y = BG_HEIGHT;
		this.replayButton.style.y = BG_HEIGHT;
		this.goldCoin.style.y = BG_HEIGHT;
		this.goldFoundText.style.y = BG_HEIGHT;
		this.winText.style.x = BG_WIDTH;
		this.winText.style.y = WIN_Y;
		this.winSun.style.opacity = 0;
	};

	this.tick = function(dt) {
		if (this.sunActive) {
			this.winSun.style.r += SUN_SPIN_RATE * dt / 1000;
		}
	};
});
