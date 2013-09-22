import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import src.util.Data as Data;
import ui.TextView as TextView;
import src.constants.gameConstants as gameConstants;

exports = Class(View, function(supr) {

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = gameConstants.GAME_WIDTH;
		opts.height = gameConstants.GAME_HEIGHT;
		this.flow = opts.parent;

		supr(this, "init", arguments);
	};

	this.buildView = function() {
		this.flow.removeSubview(this);

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/lose.png"
		});
		this.loseText = new TextView({
			parent: this,
			x: (gameConstants.GAME_WIDTH / 2) - 300,
			y: 60,
			width: 650,
			height: 200,
			text: "",
			fontFamily: "LuckiestGuyRegular",
			size: 66,
			strokeColor: 'white',
			strokeWidth: 3,
			canHandleEvents: false
		});

		this.menuButton = new ImageView({
			parent: this,
			x: (gameConstants.GAME_WIDTH / 2) - 200,
			y: 291,
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
			text: "Map",
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

			this.flow.change("lose", "map");
		});

		this.replayBtn = new ImageView({
			parent: this,
			x: (gameConstants.GAME_WIDTH / 2) + 30,
			y: 291,
			width: 170,
			height: 70,
			image: "resources/images/buttons/orange_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayBtn,
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
		this.replayBtn.onInputSelect = bind(this, "replayLevel");
	};

	this.replayLevel = function() {
		var worlds = Data.getItem("worlds"),
			world = this.flow.game.world,
			levels = worlds[world];

		this.flow.change("lose", "game");
	};

	this.update = function() {

	};

	this.enterTransition = function() {


	};

	/**
	 * Raise curtains
	 */
	this.raiseCurtain = function() {

	};

	/**
	 * transition out of view
	 */
	this.leaveTransition = function(cb, opts) {
		this.raiseCurtain();

		if (opts != null && opts.fade === false) {
			setTimeout(cb, 500);
		} else {
			animate(this.background)
			.now({ opacity: 0 })
			.then(cb);
		}
	};

	/**
	 * Called whenever the lose view is finished. This
	 * resets the view so it will be in the correct state
	 * when it is next displayed.
	 */
	this.resetView = function() {
		this.background.style.opacity = 1;
	};
});
