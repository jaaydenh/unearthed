import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.TextView as TextView;
import src.config.levels as levels;
import src.util.Data as Data;
import src.views.DiscoveryView as DiscoveryView;
import src.constants.gameConstants as gameConstants;

exports = Class(View, function(supr) {

	var SUN_WIDTH = 350,
		SUN_HEIGHT = 350,
		WIN_Y = 180,
		WIN_WIDTH = 256,
		SUN_SPIN_RATE = Math.PI / 2;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = gameConstants.GAME_WIDTH;
		opts.height = gameConstants.GAME_HEIGHT;

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
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/win.png"
		});

		this.winSun = new ImageView({
			parent: this,
			x: (gameConstants.GAME_WIDTH - SUN_WIDTH) / 2,
			y: gameConstants.GAME_HEIGHT - SUN_WIDTH - 65,
			anchorX: SUN_WIDTH / 2,
			anchorY: SUN_HEIGHT / 2,
			width: SUN_WIDTH,
			height: SUN_HEIGHT,
			opacity: 0,
			image: "resources/images/popups/win-sun.png"
		});

		this.goldFoundText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 + 20,
			y: gameConstants.GAME_HEIGHT,
			width: 100,
			height: 50,
			text: "",
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeColor: 'gold',
			strokeWidth: 4.5,
			canHandleEvents: false
		});

		this.goldCoin = new ImageView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 45,
			y: gameConstants.GAME_HEIGHT - 150,
			width: 85,
			height: 85,
			image: "resources/images/gametiles/goldcoin.png"
		});

		this.winText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH,
			y: 60,
			width: 300,
			height: 100,
			text: "Level Complete",
			fontFamily: "LuckiestGuyRegular",
			size: 58,
			strokeColor: 'white',
			strokeWidth: 3,
			canHandleEvents: false
		});

		this.nextButton = new ImageView({
			parent: this,
			x: (gameConstants.GAME_WIDTH - 154) / 2,
			y: gameConstants.GAME_HEIGHT - 30,
			width: 170,
			height: 70,
			image: "resources/images/buttons/red_button.png"
		});
		this.nextText = new TextView({
			parent: this.nextButton,
			x: 0,
			y: 0,
			width: 170,
			height: 70,
			text: "Next",
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
			x: (gameConstants.GAME_WIDTH / 2) - 300,
			y: gameConstants.GAME_HEIGHT - 30,
			width: 170,
			height: 70,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuText = new TextView({
			parent: this.menuButton,
			x: 0,
			y: 0,
			width: 170,
			height: 70,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			strokeColor: 'white',
			strokeWidth: 3,
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
			x: (gameConstants.GAME_WIDTH / 2) + 140,
			y: gameConstants.GAME_HEIGHT - 30,
			width: 170,
			height: 70,
			image: "resources/images/buttons/orange_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayButton,
			x: 0,
			y: 0,
			width: 170,
			height: 70,
			text: "Replay",
			fontFamily: "LuckiestGuyRegular",
			size: 36,
			strokeColor: 'white',
			strokeWidth: 3,
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
		.now({ x: (gameConstants.GAME_WIDTH - WIN_WIDTH) / 2 })
		.then(bind(this, function() {
			// fade in sun
			animate(this.winSun).now({ opacity: 1 });
			this.sunActive = true;
		}));

		animate(this.nextButton).now({ y: 485 });
		animate(this.replayButton).now({ y: 490 });
		animate(this.menuButton).now({ y: 490 });
		animate(this.goldCoin).now({ y: 290 });
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
		this.nextButton.style.y = gameConstants.GAME_HEIGHT;
		this.menuButton.style.y = gameConstants.GAME_HEIGHT;
		this.replayButton.style.y = gameConstants.GAME_HEIGHT;
		this.goldCoin.style.y = gameConstants.GAME_HEIGHT;
		this.goldFoundText.style.y = gameConstants.GAME_HEIGHT;
		this.winText.style.x = gameConstants.GAME_WIDTH;
		this.winText.style.y = WIN_Y;
		this.winSun.style.opacity = 0;
	};

	this.tick = function(dt) {
		if (this.sunActive) {
			this.winSun.style.r += SUN_SPIN_RATE * dt / 1000;
		}
	};
});
