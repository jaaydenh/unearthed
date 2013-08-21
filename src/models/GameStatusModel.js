import src.util.Data as Data;
import event.Emitter as Emitter;

exports = Class(Emitter, function (supr) {

	this.init = function (opts) {

		opts = merge(opts, {
			width:	50,
			height: 576,
			x: 0,
			y: 0
		});

		supr(this, 'init', [opts]);

		this._game = opts.game;
		this._goblins = 0;
		this._gameTime = 'day';
	};

	this.addGoblin = function () {
		this._goblins++;
		this.emit('UpdateGoblins', this._goblins);
	}
	
	this.removeGoblin = function () {
		this._goblins--;
		this.emit('UpdateGoblins', this._goblins);
	}

	this.setGameTime = function(time) {
		this._gameTime = time;
		this.emit('UpdateGameTime', this._gameTime);
	}
});