import ui.View;
import ui.ImageView as ImageView;
import ui.resource.Image as Image;
import ui.TextView as TextView;
import src.util.Data as Data;
import ui.ScoreView as ScoreView;
import src.constants.characterConstants as characterConstants;
import src.constants.gameConstants as gameConstants;
import ui.widget.ButtonView as ButtonView;

exports = Class(ui.View, function (supr) {

	this.init = function (opts) {

		sun_img = new Image({url: "resources/images/gametiles/sun.png"});
		moon_img = new Image({url: "resources/images/gametiles/moon.png"});

		opts = merge(opts, {
			width:	gameConstants.GAME_STATUS_WIDTH,
			height: gameConstants.GAME_STATUS_HEIGHT,
			x: 0,
			y: 0,
			zIndex: 10000,
			backgroundColor: 'black'
		});

		this._gameView = opts.gameView;

		supr(this, 'init', [opts]);

		this.build();
	};

	this.onUpdateGoblins = function(goblins) {
		this.goblinCountView.setText('x ' + goblins);
	}

	this.onUpdateGameTime = function(time) {
		if (time == 'day') {
			this.dayNightStatusView.setImage(sun_img);
		} else if (time == 'night') {
			this.dayNightStatusView.setImage(moon_img);
		}
	}

	this.menuSelect = function() {
		this._gameView.parent.end('map');
	};

	this.build = function () {

		this.menuBtn = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: 70,
			height: 45,
			image: "resources/images/buttons/orange_button.png",
			zIndex: 1
		});
		this.menuBtnText = new TextView({
			parent: this.menuBtn,
			x: 0,
			y: 0,
			width: 70,
			height: 45,
			text: "Menu",
			fontFamily: "LuckiestGuyRegular",
			size: 20,
			strokeColor: 'white',
			strokeWidth: 1.5,
			canHandleEvents: false
		});
		this.menuBtn.onInputSelect = bind(this, 'menuSelect');

		this.dayNightStatusView = new ImageView({
			superview: this,
			image: moon_img,
			x: 0,
			y: 110,
			width: 50,
			height: 50
		});

		var goblinStatusView = new ImageView({
			superview: this,
			x: 0,
			y: 170,
			width: 50,
			height: 50,
			image: 'resources/images/goblin_head.png'
		});

		this.goblinCountView = new TextView({
			superview: this,
			x: 0,
			y: 225,
			width: 50,
			height: 50,
			size: 30,
			verticalAlign: 'middle',
			horizontalAlign: 'center',
			wrap: false,
			color: '#FFFFFF'
		});


		this.startButton = new ButtonView({
		    superview: this,
		    width: 70,
		    height: 70,
		    x: 0,
		    y: 500,
		    images: {
		      up: "resources/images/quest_icon.png",
		      down: "resources/images/quest_icon.png"
		    },
		    on: {
		      up: bind(this, function () {
		 
		      		this._gameView.getQuestView().show();
				})		      
		    }
    	});
	};
});