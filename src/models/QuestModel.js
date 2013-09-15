import event.Emitter as Emitter;
import src.constants.gameConstants as gameConstants;

exports = Class(Emitter, function (supr) {
	
	this.init = function (opts) {

		this._name = opts.name;
		this._description = opts.description;
		this._reward = opts.reward;
		this._completed = false;
		this._findTileObjective = opts.findTileObjective;
		this._acquireTileObjective = opts.acquireTileObjective;

		supr(this, 'init', [opts]);

	};

	this.getDescription = function() {
		return this._description;
	}

	this.getFindTileObjective = function() {
		return this._findTileObjective;
	}

	this.getAcquireTileObjective = function() {
		return this._acquireTileObjective;
	}

	this.getCompleted = function() {
		return this._completed;
	}

	this.setCompleted = function(isCompleted) {
		this._completed = isCompleted;
	}
});
