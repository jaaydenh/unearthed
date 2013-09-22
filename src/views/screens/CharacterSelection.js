import animate;
import ui.View as View;
import ui.ImageView as ImageView;
import ui.TextView as TextView;
import src.config.levels as levels;
import src.util.Data as Data;
import src.views.DiscoveryView as DiscoveryView;
import src.constants.gameConstants as gameConstants;
import ui.widget.ButtonView as ButtonView;
import ui.widget.Toast as Toast;

exports = Class(View, function(supr) {

	this.init = function(opts) {
		opts.x = 0;
		opts.y = 0;
		opts.width = gameConstants.GAME_WIDTH;
		opts.height = gameConstants.GAME_HEIGHT;

		this.flow = opts.parent;
		this.characterChosen = 'knight';

		supr(this, "init", [opts]);

		this.designView();

		//this.showStartingQuest();
	};

	this.showStartingQuest = function() {


		this.questInfo.pop('New Quest: Search the forest for the traveler\'s portal');
	}
	
	this.designView = function() {
		this.flow.removeSubview(this);

		this.questInfo = new Toast({
		    superview: this,
		    height: 80,
		    position: 'top',
		    images: {
		        top: 'resources/images/toast/top.png'
		    },
		    zIndex: 1000,
		    popDuration: 2000
		});

		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: gameConstants.GAME_WIDTH,
			height: gameConstants.GAME_HEIGHT,
			image: "resources/images/backgrounds/character.png"
		});

		this.titleText = new TextView({
			parent: this,
			x: 350,
			y: 30,
			width: 300,
			height: 50,
			text: "So who are you?",
			fontFamily: "LuckiestGuyRegular",
			size: 120,
			strokeColor: 'white',
			strokeWidth: 2,
			canHandleEvents: false
		});

		this.knightImage = new ImageView({
			parent: this,
			x: 100,
			y: 100,
			width: 150,
			height: 150,
			image: "resources/images/characters/knight.png",
			zIndex: 5
		});

		this.wizardImage = new ImageView({
			parent: this,
			x: 325,
			y: 100,
			width: 150,
			height: 150,
			image: "resources/images/characters/wizard.png",
			zIndex: 5
		});

		this.rogueImage = new ImageView({
			parent: this,
			x: 550,
			y: 100,
			width: 150,
			height: 150,
			image: "resources/images/characters/rogue.png",
			zIndex: 5
		});

		this.archerImage = new ImageView({
			parent: this,
			x: 775,
			y: 100,
			width: 150,
			height: 150,
			image: "resources/images/characters/archer.png",
			zIndex: 5
		});

		this.glowImage = new ImageView({
			parent: this,
			x: 80,
			y: 80,
			width: 190,
			height: 190,
			image: "resources/images/characters/glow.png",
			zIndex: 0
		});

		this.knightImage.onInputSelect = bind(this, function() {
			this.characterChosen = 'knight';
			this.glowImage.style.x = 80;
		});
		this.wizardImage.onInputSelect = bind(this, function() {
			this.characterChosen = 'wizard';
			this.glowImage.style.x = 305;
		});
		this.rogueImage.onInputSelect = bind(this, function() {
			this.characterChosen = 'rogue';
			this.glowImage.style.x = 530;
		});
		this.archerImage.onInputSelect = bind(this, function() {
			this.characterChosen = 'archer';
			this.glowImage.style.x = 755;
		});

		this.doneButton = new ButtonView({
		    superview: this,
		    width: 250,
		    height: 80,
		    x: gameConstants.GAME_WIDTH / 2 - 120,
		    y: 450,
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
		      		Data.set("characterClass", this.characterChosen);	 	
					this.flow.change("character", "worlds");
				})		      
		    },
		    title: "Done",
		    text: {
		      color: "#ffffff",
		      size: 36,
		      autoFontSize: false,
		      autoSize: false
		    }
    	});


	};
});
