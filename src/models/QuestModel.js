import event.Emitter as Emitter;
import src.constants.gameConstants as gameConstants;

exports = Class(Emitter, function (supr) {
	
	this.init = function (opts) {

		this._name = opts.name;
		this._description = opts.description;
		this._reward = opts.reward;
		this._completed = false;

		supr(this, 'init', [opts]);

	};

	this.getCompleted = function() {
		return this._completed;
	}

	this.setCompleted = function(isCompleted) {
		this._completed = isCompleted;
	}
});
