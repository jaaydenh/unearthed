import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import src.util.Data as Data;
import ui.TextView as TextView;

exports = Class(View, function(supr) {

	var BG_WIDTH = 1024,
		BG_HEIGHT = 576,
		DRIP_WIDTH = 272,
		DRIP_HEIGHT = 164,
		BLOB_WIDTH = 165,
		BLOB_HEIGHT = 97;

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = BG_WIDTH;
		opts.height = BG_HEIGHT;
		this.flow = opts.parent;

		supr(this, "init", arguments);
	};

	this.buildView = function() {
		this.flow.removeSubview(this);

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/lose.png"
		});
		this.loseText = new TextView({
			parent: this,
			x: (BG_WIDTH / 2) - 250,
			y: 60,
			width: 550,
			height: 200,
			text: "",
			fontFamily: "LuckiestGuyRegular",
			size: 56,
			strokeColor: 'white',
			strokeWidth: 3,
			canHandleEvents: false
		});

		this.menuButton = new ImageView({
			parent: this,
			x: (BG_WIDTH / 2) - 105,
			y: 291,
			width: 70,
			height: 34,
			image: "resources/images/buttons/orange_button.png"
		});
		this.menuText = new TextView({
			parent: this.menuButton,
			x: 0,
			y: 0,
			width: 70,
			height: 34,
			text: "Map",
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

			this.flow.change("lose", "map");
		});

		this.replayBtn = new ImageView({
			parent: this,
			x: (BG_WIDTH / 2) + 30,
			y: 291,
			width: 154,
			height: 64,
			image: "resources/images/buttons/red_button.png"
		});
		this.replayText = new TextView({
			parent: this.replayBtn,
			x: 0,
			y: 0,
			width: 82,
			height: 34,
			text: "Replay",
			fontFamily: "LuckiestGuyRegular",
			size: 16,
			strokeColor: 'white',
			strokeWidth: 1.5,
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
