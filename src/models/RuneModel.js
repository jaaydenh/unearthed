import src.constants.gameConstants as gameConstants;
import event.Emitter as Emitter;
import src.util.Utility as Utility;

exports = Class(Emitter, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			width:	gameConstants.RUNE_SIZE,
			height: gameConstants.RUNE_SIZE
		});

		this._runeType = opts.runeType;
		this._game = opts.game;
		
		this._runeNumber = -1;		

		supr(this, 'init', [opts]);

	};

	this.setRuneNumber = function(num) {
		this._runeNumber = num;
		this.emit('Update', this._runeNumber);
	}
	this.getRuneNumber = function() {
		return this._runeNumber;
	}
	this.placeRune = function() {
		switch (this._runeType) {
			case "campfire":
				var creatureTiles = [];

				creatureTiles = this._game.getCreaturesInLayout(false);
				if (creatureTiles.length == 0) {
					creatureTiles = this._game.getCreaturesInLayout();
				}
				var success = false;
				if (creatureTiles.length > 0) {
					creatureTiles = Utility.shuffle(creatureTiles);
					while (!success && creatureTiles.length > 0) {
						var creatureTile = creatureTiles.pop();
						if (this._game._gameModel.placeRune(this, creatureTile.getTileNumber())) {
							success = true;
						}
					
					}
					if (!success) {
						// notify player campfire cannot be places because no available rune locations
						alert('no available rune locations');
					}
				} else {
					// notify player there are no creatures on the board
					alert('no creatures can be found');
				}
			break;
		}

	}
});