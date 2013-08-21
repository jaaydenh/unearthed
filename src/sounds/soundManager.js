import src.lib.Enum as Enum;
import src.constants.debugConstants as debugConstants;
import AudioManager;
import .soundData;

var Sound = Class(function () {
	this.init = function (opts) {
		this._dt = 0;

		this._scheduledDT = -1;
		this._scheduledVolume = 1;

		this._sound = opts.sound;
		this._name = opts.name;

		this._playing = false;
		this._length = opts.length;
		this._repeat = opts.repeat;

		this._volumeTarget = 1;
		this._volume = 1;
		this._volumeSpeed = 0.001;
	};

	this.play = function (volume) {
		if (this._playing) {
			if (volume !== undefined) {
				this._volumeTarget = volume;
			}
			return;
		}
		if (volume !== undefined) {
			this._volumeTarget = volume;
			this._volume = volume;
			this._sound.setVolume(this._name, this._volume);
		}
		this._sound.play(this._name);
		this._playing = true;
	};

	this.update = function (dt) {
		if (this._scheduledDT !== -1) {
			this._scheduledDT -= dt;
			if (this._scheduledDT <= 0) {
				this._scheduledDT = -1;
				this.play(this._scheduledVolume);
				return;
			}
		}

		if (!this._playing) {
			return;
		}
		this._dt += dt;
		if (this._dt >= this._length) {
			if (this._repeat) {
				this._sound.play(this._name);
			} else {
				this._playing = false;
			}
		}

		if (this._volume !== this._volumeTarget) {
			var step = dt * this._volumeSpeed;
			if (this._volume < this._volumeTarget) {
				this._volume = Math.min(this._volume + step, this._volumeTarget);
			} else if (this._volume > this._volumeTarget) {
				this._volume = Math.max(this._volume - step, this._volumeTarget);
			}
			if (this._volume === 0) {
				this._sound.stop(this._name);
				this._playing = false;
			} else {
				this._sound.setVolume(this._name, this._volume);
			}
		}
	};

	this.setVolume = function (volume, speed) {
		this._volumeTarget = volume;
		this._volumeSpeed = speed || exports.MEDIUM;
	};

	this.schedule = function (timeFromNow, volume) {
		if (this._scheduledDT === -1) {
			this._scheduledDT = timeFromNow;
			this._scheduledVolume = volume;
		}
	};
});

var SoundManager = Class(function () {
	this.init = function () {
		this._sound1 = new AudioManager({
			path: 'resources/sounds/',
			files: soundData.files
		});
		this._sound2 = new AudioManager({
			path: 'resources/sounds/music/',
			files: {
				levelmusic: {
					volume: 0.5,
					loop: true,
					background: true
				}
			}
		});

		this._menuPlaying = false;
		this._gamePlaying = false;

		this._backgroundSetVolume = false;
		this._backgroundTargetVolume = 0.5;
		this._backgroundVolume = 0.5;

		this._activeSounds = [];
		this._sounds = {}
	};

	this.play = function (name) {
		if (debugConstants.noSound) {
			return;
		}
		if (soundData.randomFiles[name]) {
			var sounds = soundData.randomFiles[name];
			name = sounds[(Math.random() * sounds.length) | 0];
		}

		if (soundData.files[name]) {
			var file = soundData.files[name];
			if (file.update) {
				var sound = this._sounds[name];
				if (!sound) {
					file.sound = this._sound1;
					file.name = name;
					sound = new Sound(file);
					this._sounds[name] = sound;
					this._activeSounds.push(sound);
				} 
				sound.play();
			} else if (file.multi) {
				if (!('count' in file)) {
					file.count = 0;
				}
				if (file.count === 0) {
					this._sound1.play(name);
				}
				file.count++;
			} else {
				this._sound1.play(name);
			}
		}
	};

	this.stop = function (name) {
		if (soundData.files[name]) {
			var file = soundData.files[name];
			if (file.multi) {
				file.count--;
				if (file.count === 0) {
					this._sound1.stop(name);
				}
			} else {
				this._sound1.stop(name);
			}
		}		
	};

	this.setMusicMuted = function(isMuted) {
		this._sound2.setMusicMuted(isMuted);
	}

	this.stopAllSounds = function () {
		var files = soundData.files;

		for (var name in files) {
			var file = files[name];
			if (file.multi) {
				file.count = 0;
			}
			this._sound1.stop(name);
		}
	};

	this.playMenuBackground = function () {
		if (this._menuPlaying || debugConstants.noMusic) {
			return;
		}

		this._sound2.stop('levelmusic');
		this._sound1.play('menuBackground');
		this._sound1.setVolume('menuBackground', 1);

		this._gamePlaying = false;
		this._menuPlaying = true;

		this._backgroundTargetVolume = 1;
		this._backgroundVolume = 1;

		this._backgroundSetVolume = (function (sound) {
			return function (volume) {
				sound.setVolume('menuBackground', volume);
			};
		})(this._sound1);
	};

	this.playGameBackground = function () {
		if (this._gamePlaying || debugConstants.noMusic) {
			return;
		}

		//this._sound1.stop('menuBackground');
		this._sound2.play('levelmusic');
		this._sound2.setVolume('levelmusic', 1);

		this._menuPlaying = false;
		this._gamePlaying = true;

		this._backgroundTargetVolume = 0.5;
		this._backgroundVolume = 0.5;

		this._backgroundSetVolume = (function (sound) {
			return function (volume) {
				sound.setVolume('levelmusic', volume);
			};
		})(this._sound2);
	};

	this.setBackgroundVolume = function (volume) {
		this._backgroundSetVolume && this._backgroundSetVolume(volume);
		this._backgroundTargetVolume = volume;
		this._backgroundVolume = volume;
	};

	this.stopBackground = function () {
		this._sound1.stop('menuBackground');
		this._sound2.stop('levelmusic');
	};

	this.setBackgroundTargetVolume = function (backgroundTargetVolume) {
		this._backgroundTargetVolume = backgroundTargetVolume;
	};

	this.update = function (dt) {
		if (this._backgroundSetVolume) {
			var step = dt * 0.001;
			if (this._backgroundVolume < this._backgroundTargetVolume) {
				this._backgroundVolume = Math.min(this._backgroundVolume + step, this._backgroundTargetVolume);
				this._backgroundSetVolume(this._backgroundVolume);
			} else if (this._backgroundVolume > this._backgroundTargetVolume) {
				this._backgroundVolume = Math.max(this._backgroundVolume - step, this._backgroundTargetVolume);
				this._backgroundSetVolume(this._backgroundVolume);			
			}
		}

		var activeSounds = this._activeSounds;
		var i = activeSounds.length;
		while (i) {
			activeSounds[--i].update(dt);
		}
	};

	this.setVolume = function (name, volume, speed) {
		this._sounds[name] && this._sounds[name].setVolume(volume, speed);
	};

	/**
	 * Schedule a sound to start playing a number of milliseconds from now at a given volume...
	 */
	this.schedule = function (name, timeFromNow, volume) {
		var sound = this._sounds[name];
		if (!sound) {
			if (soundData.files[name]) {
				var file = soundData.files[name];
			} else {
				return;
			}

			file.sound = this._sound1;
			file.name = name;
			sound = new Sound(file);
			this._sounds[name] = sound;
			this._activeSounds.push(sound);
		}

		sound.schedule(timeFromNow, volume || 1);
	};
});

exports = new SoundManager();

exports.SLOW = 0.0005;
exports.MEDIUM = 0.001;
exports.FAST = 0.002;