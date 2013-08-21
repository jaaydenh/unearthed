import src.util.Data as Data;
import event.Emitter as Emitter;
import src.constants.gameConstants as gameConstants;

exports = Class(Emitter, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			width:	gameConstants.PLAYER_WIDTH,
			height: gameConstants.PLAYER_HEIGHT,
			x: 735,
			y: 0
		});

		supr(this, 'init', [opts]);

		this._game = opts.game;
		this._hearts = 0;
		this._gold = 0;
		this.companions = [];
		//this._inventory = new Array(4);
		//this.initInventory();
	};

	this.initInventory = function() {

		this._inventory = Data.getItem("inventory");

		for (var i =0;i < this._inventory.length;i++) {
			if (this._inventory[i] != "") {
				this.emit('AddInventoryItem', {tile: this._inventory[i], invPosition: i});	
			}
			
		}		
	}
	this.removeInventory = function(pos) {
		this._inventory[pos] = "";
		Data.set("inventory", this._inventory);	
	}
	this.getHearts = function() {
		return this._hearts;
	}

	this.updateGold = function() {
		this.gold = Data.getItem("gold");
		this.emit('UpdateGold', this.gold);
	}

	this.setHearts = function(hearts) {
		this._hearts = hearts;
		this.emit('UpdateHearts', this._hearts);
	}

	this.addHeart = function() {
		this._hearts++;
		this.emit('UpdateHearts', this._hearts);
	}

	this.removeHeart = function() {
		this._hearts--;
		this.emit('UpdateHearts', this._hearts);
	}

	this.addToInventory = function(tile) {
		var success = false;
		var positionAdded = -1;

		for (var i =0;i < this._inventory.length;i++) {
			if (this._inventory[i] == '') {
				this._inventory[i] = tile;
				success = true;
				positionAdded = i;
				break;
			}
		}
		//this._inventory.push(tile);
		if (success == true) {
			this.emit('AddInventoryItem', {tile: tile, invPosition: positionAdded});
			Data.set("inventory", this._inventory);	
		}
		
		return success;
	}


});