import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.TextView;
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
			y: 0
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

	this.build = function () {

		this.dayNightStatusView = new ui.ImageView({
			superview: this,
			image: moon_img,
			x: 0,
			y: 110,
			width: 50,
			height: 50
		});

		var goblinStatusView = new ui.ImageView({
			superview: this,
			x: 0,
			y: 170,
			width: 50,
			height: 50,
			image: 'resources/images/goblin_head.png'
		});

		this.goblinCountView = new ui.TextView({
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