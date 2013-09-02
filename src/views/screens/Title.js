import animate;
import device;
import ui.View as View;
import ui.ImageView as ImageView;
import src.config.levels as levels;
import src.util.Data as Data;
import src.constants.gameConstants as gameConstants;
import ui.TextView as TextView;
import ui.widget.ButtonView as ButtonView;
import src.views.screens.Flow as Flow;
import src.config.levels;

exports = Class(View, function (supr) {


	this.init = function(opts) {

		opts = merge(opts, {
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT
		});
		this.parent = opts.parent;

		supr(this, 'init', [opts]);

		this.buildView();
	};

	this.buildView = function() {

		this.style.backgroundColor = 'grey';

		this.TitleText = new TextView({
			parent: this,
			x: gameConstants.GAME_WIDTH / 2 - 220,
			y: 50,
			width: 450,
			height: 150,
			text: "Unearthed",
			fontFamily: "LuckiestGuyRegular",
			size: 140,
			strokeColor: 'white',
			strokeWidth: 4.5,
			canHandleEvents: false
		});

		this.startButton = new ButtonView({
		    superview: this,
		    width: 250,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 120,
		    y: 250,
		    images: {
		      up: "resources/images/buttons/brown_button_up.png",
		      down: "resources/images/buttons/brown_button_down.png"
		    },
		    scaleMethod: "9slice",
		    sourceSlices: {
		      horizontal: {left: 80, center: 116, right: 80},
		      vertical: {top: 10, middle: 80, bottom: 10}
		    },
		    destSlices: {
		      horizontal: {left: 40, right: 40},
		      vertical: {top: 4, bottom: 4}
		    },
		    on: {
		      up: bind(this, function () {
		 
			      	this.flow = new Flow({ 
						superview: this.parent,
						width: gameConstants.GAME_WIDTH,
						height: gameConstants.GAME_HEIGHT,
						clip: true,
						level: undefined
					});

					this.parent.removeSubview(this);
				})		      
		    },
		    title: "Start",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});

		this.resetButton = new ButtonView({
		    superview: this,
		    width: 250,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 120,
		    y: 400,
		    images: {
		      up: "resources/images/buttons/brown_button_up.png",
		      down: "resources/images/buttons/brown_button_down.png"
		    },
		    scaleMethod: "9slice",
		    sourceSlices: {
		      horizontal: {left: 80, center: 116, right: 80},
		      vertical: {top: 10, middle: 80, bottom: 10}
		    },
		    destSlices: {
		      horizontal: {left: 40, right: 40},
		      vertical: {top: 4, bottom: 4}
		    },
		    on: {
		      up: function() {

					Data.setItem("gold", 0);
					Data.set("tilesSeen", []);	
					Data.set("inventory", ['','','','']);
					Data.set("specials", []);
					Data.set("worlds", {});
					var worlds = Data.get("worlds") || {};
					src.config.levels.list.forEach(function(name){
						!(name in worlds) && (worlds[name] = {
							unlocked: 1,
							last: -1,
							currentLevel: 1
						});
					});

					Data.set("worlds", worlds);
		      }
		    },
		    title: "Reset",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});
	};

	this.close = function() {

	};
});
