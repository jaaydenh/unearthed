import event.Emitter as Emitter;
import src.util.Utility as Utility;
import src.constants.gameConstants as gameConstants;

exports = Class(Emitter, function (supr) {
	
	this.init = function (opts) {
		
		this.gridWidth = opts.gridWidth;
		this.gridHeight = opts.gridHeight;

		supr(this, 'init', [opts]);

		this._tileDeck = new Array();
		this._visibleGoblins = 0;
		this._runeGrid = [];
	};
	this.getVisibleGoblins = function() {
		return this._visibleGoblins;
	}
	this.updateVisibleGoblins = function(change) {
		this._visibleGoblins += change;
	}
	this.getTileDeck = function() {
		return this._tileDeck;
	}
	this.getTileFromDeck = function(index) {
		return this._tileDeck[index];
	}
	this.removeTopTileFromDeck = function() {
		return this._tileDeck.pop();
	}
	this.addTileToDeck = function(tile) {
		this._tileDeck.push(tile);
	}

	this.placeRune = function(rune, tileNumber) {
		var runePositions = [];
		var success = false;
		runePositions = this.getRunePositionsForTile(tileNumber);
		if (runePositions.length > 1) {
			runePositions = Utility.shuffle(runePositions);
		}

		for(var i = 0; i < runePositions.length; i ++) {
			var isRuneNumberTaken = false;

			this._runeGrid.forEach(bind(this, function(rune) {
				if (rune.getRuneNumber() == runePositions[i]) {
					isRuneNumberTaken = true;
				}
			}))

			if (isRuneNumberTaken == false) {
				rune.setRuneNumber(runePositions[i]);
				this._runeGrid.push(rune);
				success = true;
				break;
			}
		}
		
		return success;
	}

	this.getRunePositionsForTile = function(tileNumber) {
		var runePositions = [];
		var row = Math.floor(tileNumber / gameConstants.TILE_GRID_WIDTH);
		var col = tileNumber % gameConstants.TILE_GRID_WIDTH;
		
		if (tileNumber == 0) {
			// top left corner
			runePositions.push(0);
		} else if (tileNumber == this.gridWidth - 1) {
			// top right corner
			runePositions.push(this.gridWidth - 2);
		} else if (tileNumber == (this.gridWidth * this.gridHeight) - 1) {
			// bottom right corner
			runePositions.push(tileNumber - this.gridWidth - row); // top-left
		} else if (tileNumber == (this.gridWidth * this.gridHeight) - this.gridWidth) {
			// botton left corner
			runePositions.push(tileNumber - this.gridWidth - row + 1); // top-right
		} else if (row == 0) {
			runePositions.push(tileNumber - row); // bottom-right
			runePositions.push(tileNumber - row - 1); // bottom -left
		} else if (col == 0) {
			runePositions.push(tileNumber - this.gridWidth - row + 1); // top-right
			runePositions.push(tileNumber - row); // bottom-right
		} else if (row == gameConstants.TILE_GRID_HEIGHT - 1) {
			runePositions.push(tileNumber - this.gridWidth - row + 1); // top-right
			runePositions.push(tileNumber - this.gridWidth - row); // top-left
		} else if (col == gameConstants.TILE_GRID_WIDTH - 1) {
			runePositions.push(tileNumber - this.gridWidth - row); // top-left
			runePositions.push(tileNumber - row - 1); // bottom -left
		} else {
			runePositions.push(tileNumber - row); // bottom-right
			runePositions.push(tileNumber - row - 1); // bottom -left
			runePositions.push(tileNumber - this.gridWidth - row + 1); // top-right
			runePositions.push(tileNumber - this.gridWidth - row); // top-left
		}

		return runePositions;
	}

	this.shuffleDeck = function() {
	    var tmp, current, top = this.tileDeck.length;

	    if(top) while(--top) {
	    	current = Math.floor(Math.random() * (top + 1));
	    	tmp = this._tileDeck[current];
	    	this._tileDeck[current] = this._tileDeck[top];
	    	this._tileDeck[top] = tmp;
	    }

	}
});
