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

		var creatureTiles = [];

		//creatureTiles = this._game.getCreaturesInLayout(false);
		creatureTiles = this._game.getTilesWithProperty('_creature', false);
		if (creatureTiles.length == 0) {
			//creatureTiles = this._game.getCreaturesInLayout();
			creatureTiles = this._game.getTilesWithProperty('_creature');
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
	}
});