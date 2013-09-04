import device;
import AudioManager;
import src.views.screens.Flow as Flow;
import src.config.levels;
import src.util.Data as Data;
import src.sounds.soundManager as soundManager;
import src.views.screens.Title as Title;
import src.constants.gameConstants as gameConstants;

var worlds = Data.get("worlds") || {};

src.config.levels.list.forEach(function(name){
	!(name in worlds) && (worlds[name] = {
		unlocked: 1,
		last: -1,
		currentLevel: 1
	});
});

Data.set("worlds", worlds);

var gold = Data.get("gold") || 0;
Data.setItem("gold", gold);

var tilesSeen = Data.get("tilesSeen") || [];
Data.set("tilesSeen", tilesSeen);	

var inventory = Data.get("inventory") || ['','','',''];
Data.set("inventory", inventory);

var specials = Data.get("specials") || [];
Data.set("specials", specials);

var newGame = Data.get("newGame") || 'true';
Data.set("newGame", newGame);

var characterClass = Data.get("characterClass") || '';
Data.set("characterClass", characterClass);

var boundsWidth = gameConstants.GAME_WIDTH;
var boundsHeight = gameConstants.GAME_HEIGHT;

exports = Class(GC.Application, function () {
	
	this._settings = {
		alwaysRepaint: true,
		clearEachFrame: true,
		preload: ["resources/images"],
	};

	this.scaleUI = function () {
		if (device.height < device.width) {
			this.baseWidth = boundsWidth;
			this.baseHeight = device.height * (boundsWidth / device.width);
			this.scale = device.width / this.baseWidth;
		} else {
			this.baseWidth = boundsHeight;
			this.baseHeight = device.height * (boundsHeight / device.width);
			this.scale = device.height / this.baseHeight;
		}
		this.view.style.scale = this.scale;
		this.view.style.x = (device.width - (boundsWidth * this.scale)) / 2;
		this.view.style.y = (device.height - (boundsHeight * this.scale)) / 2;
	};

	this.initUI = function() {
		
	};
	
	this.launchUI = function () {
		
		this.scaleUI();
		
		this.title = new Title({
			superview: this.view,
			parent: this
		});

		/*this.flow = new Flow({ 
			superview: this.view,
			width: boundsWidth,
			height: boundsHeight,
			clip: true,
			level: undefined
		});*/

		this.initAudio();
	};
	
	this.initAudio = function () {

		soundManager.playGameBackground();
	};

});
