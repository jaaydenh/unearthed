import device;
import AudioManager;
import src.flow.Flow as Flow;
import src.config.levels;
import src.util.Data as Data;
import src.sounds.soundManager as soundManager;

var worlds = Data.get("worlds") || {};

src.config.levels.list.forEach(function(name){
	!(name in worlds) && (worlds[name] = {
		unlocked: 1,
		last: -1,
		currentLevel: 1
	});
});

var gold = Data.get("gold") || 0;
Data.setItem("gold", gold);

var tilesSeen = Data.get("tilesSeen") || [];
Data.set("tilesSeen", tilesSeen);	

var inventory = Data.get("inventory") || ['','','',''];
Data.set("inventory", inventory);

var specials = Data.get("specials") || [];
Data.set("specials", specials);

if ( false ) { // localStorage debugging
	worlds = {
		"forest": {
			unlocked: 12,
			last: 10
		},
		"darkforest": {
			unlocked: 36,
			last: 14
		}
	};
}

Data.set("worlds", worlds);

var boundsWidth = 1024;
var boundsHeight = 576;

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
		
		this.flow = new Flow({ 
			superview: this.view,
			width: boundsWidth,
			height: boundsHeight,
			clip: true,
			level: undefined
		});

		this.initAudio();
	};
	
	this.initAudio = function () {

		soundManager.playGameBackground();
	};

});
