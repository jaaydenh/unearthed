import ui.View;
import ui.ImageView;
import ui.resource.Image as Image;
import ui.TextView;
import src.util.Data as Data;
import ui.ScoreView as ScoreView;
import src.constants.characterConstants as characterConstants;
import src.constants.gameConstants as gameConstants;
import ui.ImageView as ImageView;
import src.views.InventoryItemView as InventoryItemView;
import src.views.DogItemView as DogItemView;
import src.views.RabbitItemView as RabbitItemView;
import src.views.CatItemView as CatItemView;

exports = Class(ui.View, function (supr) {

	this.init = function(opts) {

		health_img = new Image({url: "resources/images/heart.png"});

		opts = merge(opts, {
			width:	gameConstants.PLAYER_WIDTH,
			height: gameConstants.PLAYER_HEIGHT,
			x: 765,
			y: 0,
			canHandleEvents: true,
			zIndex: 10000,
			backgroundColor: 'black'
		});
		this.game = opts.game;
		this._playerModel = opts.playerModel;

		supr(this, 'init', [opts]);
		this.canHandleEvents(true);
		this._hearts = [];

		this.characterClass = Data.get("characterClass");
		this.build();
	};

	this.onAddInventoryItem = function(item) {
		var inventoryItem;

		if (item.tile == 'life_potion') {
			inventoryItem = new InventoryItemView({
				playerView: this,
				invPosition: item.invPosition,
				game: this.game,
				playerModel: this._playerModel,
				itemType: item.tile
			});
		} else if (item.tile == 'dog') {
			inventoryItem = new DogItemView({
				tileType: 'dog',
				levelStart: false,
				game: this.game
			});
		} else if (item.tile == 'rabbit') {
			inventoryItem = new RabbitItemView({
				tileType: 'rabbit',
				levelStart: false,
				game: this.game
			});
		} else if (item.tile == 'cat') {
			inventoryItem = new CatItemView({
				tileType: 'cat',
				levelStart: false,
				game: this.game
			});
		}
		this.setInventoryItemPos(inventoryItem, item.invPosition);
		//this.game.addSubview(inventoryItem);
		this.addSubview(inventoryItem);
	}

	this.onUpdateGold = function(gold) {
		this.GoldCountText.setText(gold);
	}

	this.onUpdateHearts = function(hearts) {
		this._hearts.forEach(bind(this, function(heart) {
			this.removeSubview(heart);
		}))
		this._hearts = [];
		for(var i = 1; i <= hearts; i++) {
			this._addHeartView();
		}
	}

	this._addHeartView = function() {
		var x = this._hearts.length * 42 + 10;
		var y = 6;
		if (this._hearts.length > 4) {
			y = 42;
			x = (this._hearts.length - 5) * 42 + 10;
		}
		var heartview = new ui.ImageView({
			superview: this,
			image: health_img,
			x: x,
			y: y,
			width: 42,
			height: 42
		});
		this._hearts.push(heartview);
	}

	this.build = function() {

		this.gold = new ui.ImageView({
			parent: this,
			x: 15,
			y: 53,
			width: 50,
			height: 50,
			image: 'resources/images/gametiles/goldcoin.png'
		});

		this.GoldCountText = new ui.TextView({
			parent: this,
			x: 50,
			y: 50,
			width: 100,
			height: 50,
			text: Data.getItem("gold"),
			fontFamily: "LuckiestGuyRegular",
			size: 40,
			strokeColor: 'gold',
			strokeWidth: 4.5,
			canHandleEvents: false
		});

		this.characterImage = new ImageView({
			parent: this,
			x: 15,
			y: 110,
			width: 150,
			height: 150,
			image: "resources/images/characters/" + this.characterClass + ".png"
		});
	};

	this.setInventoryItemPos = function(item, invPosition) {
		var x,y;
		switch (invPosition)
		{
			case 0:
		      	x = 0;
			  	y = gameConstants.PLAYER_HEIGHT - 220;
		 	break;
			case 1:
		  		x = 100;
		  		y = gameConstants.PLAYER_HEIGHT - 220;
			break;
			case 2:
		  	  	x = 0;
 				y = gameConstants.PLAYER_HEIGHT - 110;
			break;
			case 3:
		  		x = 100;
		  		y = gameConstants.PLAYER_HEIGHT - 110;
			break;
		}
		item.style.x = x;
		item.style.y = y;
	};

	/*this.setInventoryItemPos = function(item, invPosition) {
		var x,y;
		switch (invPosition)
		{
			case 0:
		      	x = gameConstants.GAME_WIDTH - 238;
			  	y = gameConstants.PLAYER_HEIGHT - 220;
		 	break;
			case 1:
		  		x = gameConstants.GAME_WIDTH - 138;
		  		y = gameConstants.PLAYER_HEIGHT - 220;
			break;
			case 2:
		  	  	x = gameConstants.GAME_WIDTH - 238;
 				y = gameConstants.PLAYER_HEIGHT - 110;
			break;
			case 3:
		  		x = gameConstants.GAME_WIDTH - 138;
		  		y = gameConstants.PLAYER_HEIGHT - 110;
			break;
		}
		item.style.x = x;
		item.style.y = y;
	};*/
});