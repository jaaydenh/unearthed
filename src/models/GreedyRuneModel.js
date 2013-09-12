import src.constants.gameConstants as gameConstants;
import event.Emitter as Emitter;
import src.util.Utility as Utility;
import src.models.RuneModel as RuneModel;

exports = Class(RuneModel, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			runeType: opts.runeType,
			game: opts.game
		});

		supr(this, 'init', [opts]);
	};

	this.placeRune = function() {

		var valuableTiles = [];

		valuableTiles = this._game.getTilesWithProperty('_valuable', false);
		if (valuableTiles.length == 0) {
			valuableTiles = this._game.getTilesWithProperty('_valuable');
		}
		var success = false;
		if (valuableTiles.length > 0) {
			valuableTiles = Utility.shuffle(valuableTiles);
			while (!success && valuableTiles.length > 0) {
				var valuableTile = valuableTiles.pop();
				if (this._game._gameModel.placeRune(this, valuableTile.getTileNumber())) {
					success = true;
				}
			}
			if (!success) {
				// notify player campfire cannot be places because no available rune locations
				alert('no available rune locations');
			}
		} else {
			// notify player there are no creatures on the board
			alert('no valuable tiles can be found');
		}

	}
});