import animate;
import ui.ImageView as ImageView;
import ui.View as View;

import src.views.screens.WorldSelect as WorldSelect;
import src.views.screens.Game as Game;
import src.views.screens.Win as Win;
import src.views.screens.Lose as Lose;
import src.views.screens.CharacterSelection as CharacterSelection;

import src.util.Data as Data;
import ui.TextView;
import src.sounds.soundManager as soundManager;
import src.views.dialogs.StoryView as StoryView;
import adventuremap.AdventureMap as AdventureMap;
import src.settings.gridSettings as gridSettings;
import src.settings.nodeSettings as nodeSettings;
import src.settings.pathSettings as pathSettings;
import src.settings.tileSettings as tileSettings;
import src.models.QuestModel as QuestModel;
import ui.widget.Toast as Toast;

import src.constants.debugConstants as debugConstants;
import .data;

exports = Class(View, function(supr) {

	var BG_WIDTH = 1024,
		BG_HEIGHT = 576,
		ANIM_TIME = 500;

	this.init = function(opts) {
		supr(this, "init", arguments);

		this._locked = false;
	};

	this.buildView = function() {
		this.background = new ImageView({
			parent: this,
			x: 0,
			y: 0,
			width: BG_WIDTH,
			height: BG_HEIGHT,
			image: "resources/images/backgrounds/main.png"
		});

		this.story = new StoryView({
			parent: this
		})

		this.worlds = new WorldSelect({
			parent: this
		});

		this.game = new Game({
			parent: this
		});

		this.win = new Win({
			parent: this
		});

		this.lose = new Lose({
			parent: this
		});

		this.character = new CharacterSelection({
			parent: this
		})

		this.questInfo = new Toast({
		    superview: this,
		    position: 'top',
		    images: {
		        top: 'resources/images/toast/top.png'
		    }
		});

		this.startGame();
	};

	this.startGame = function() {
		
		// check if this is a new game
		var newGame = Data.get("newGame");
		if (newGame == 'true') {
			Data.setItem("newGame", 'false');

			this.story.setDialog("You wake up alone at night in the forest. You have no memory of how you got here. You are carrying nothing except a note that says to find the traveler's portals...");
			this.story.setCallback(this.newGame);

			this.removeSubview(this.worlds);
			this.addSubview(this.story);
			this.story.show();

		} else {
			//this.worlds.select();
			//this.addSubview(this.worlds);
		}	
	}

	this.newGame = function() {
		var quest = new QuestModel({
			name: 'Find the traveler\'s portal',
			description: 'Search the forest to find the lost traveler\'s portals connecting the realm',
			reward: '10g' 
		})
		
		var quests = Data.get("quests");
		quests.push(quest);
		Data.set("quests", quests);

		animate(this).now(
			bind(this, function () {
				// this.parent.questInfo.pop('Quest: Find the traveler\'s portal')
				this.parent.showScreen("character")
			})

		)
		.wait(200)
		.then(
			bind(this, function () {
				this.parent.character.showStartingQuest();
			})

		);

	}

	this.loadMap = function() {
		this._adventureMap = new AdventureMap({
			superview: this,
			x: 0,
			y: 0,
			width: 1024,
			height: 576,
			editMode: false,
			gridSettings: gridSettings,
			tileSettings: tileSettings,
			pathSettings: pathSettings,
			nodeSettings: nodeSettings,
			visible: false
		});
		this._adventureMap.load(data);
		this._adventureMap.setScale(0.5);
		this._adventureMap.on('ClickNode', bind(this, 'onClickNode'));


		var world = Data.getItem('worlds')[this.game.world];
		this.levelUnlocked = world.unlocked;
		this.currentLevel = world.currentLevel;

		this.unlockLevels(this.levelUnlocked);
		this.setLevelPosition(this.levelUnlocked, this.currentLevel);
	}

	this.unlockLevels = function (levelUnlocked) {

		var adventureMapModel = this._adventureMap.getModel();
		var data = adventureMapModel.getData();
		var grid = data.grid;
		var width = data.width;
		var height = data.height;
		var nodes = adventureMapModel.getNodesById(); 
		
		for (var i = 2;i <= levelUnlocked;i++) {
			var tile = nodes[i];	
			if (tile.id == i) {
				tile.node = 4;
			}
		}

		/*for (var i = 2;i <= levelUnlocked;i++) {
			for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					var tile = grid[y][x];
				
					if (tile.id == i) {
						tile.node = 4;
						break;
						break;
					}
				}
			}
			//data.grid[unlockedNodeTiles[i].y][unlockedNodeTiles[i].x].node = 4;	
		}*/
		
		var adventureMapLayers = this._adventureMap.getAdventureMapLayers();
		var i = adventureMapLayers.length;
		while (i) {
			adventureMapLayers[--i].refreshAll();
		}
		
	};

	this.showScreen = function(screen) {
		this.addSubview(this[screen]);
	}

	this.movePlayer = function(newNodeId) {
		var adventureMapModel = this._adventureMap.getModel();
		var adventureMapView = this._adventureMap.getAdventureMapView();
		var nodes = adventureMapModel.getNodesById();
		adventureMapView.movePlayer(nodes[newNodeId]);
	}

	this.setLevelPosition = function (newNodeId, oldNodeId) {
		var adventureMapView = this._adventureMap.getAdventureMapView();
		var adventureMapModel = this._adventureMap.getModel();
		var nodes = adventureMapModel.getNodesById(); 

		adventureMapModel.removeTagById(oldNodeId, 'Player');
		
		if (newNodeId > adventureMapModel.getMaxNodeId()) {
			newNodeId = 1;
		}

		adventureMapModel.addTagById(newNodeId, 'Player');

		this._adventureMap.focusNodeById(newNodeId);
	};

	this.onClickNode = function (tile) {
		//this.showText('Clicked on node ' + tile.id);
		
		if (debugConstants.allLevelsUnlocked) {
			this.startLevel(tile);
		} else {
			// node 1 is for locked levels
			if (tile.node != 1) {
				this.setLevelPosition(this.levelUnlocked, this.currentLevel);
				this.startLevel(tile);
			}
		}
	};

	this.startLevel = function(tile) {
		//if (tile.node != 1) {
			var worlds = this.worlds, game = this.game;
			
			game.style.opacity = 1;
			this.addSubview(game);

			game.start({tile:tile});
			game.enterTransition(bind(this, function() {
				this._adventureMap.getAdventureMapView().style.visible = false;
				//this.removeSubview(worlds);
				//this.background.style.visible = false;
				this.unlock();
			}));
		//}
	}

	/*this.showText = function (text) {
		this._nodeText.setText(text);
		this._nodeText.style.visible = true;
		this._clickTimeout && clearTimeout(this._clickTimeout);
		this._clickTimeout = setTimeout(
			bind(
				this,
				function () {
					this._nodeText.style.visible = false;
				}
			),
			2000
		);
	};*/
	// mutex on view transitions
	this.locked = function() {
		return this._locked;
	};

	// lock view transitions and disable user input
	this.lock = function() {
		this._locked = true;
		GC.app.view.getInput().blockEvents = true;
	};

	// unlock view transitions and enable user input
	this.unlock = function() {
		this._locked = false;
		GC.app.view.getInput().blockEvents = false;
	};

	/**
	 * Acts as controller between various flow modules, and
	 * implements some transitions.
	 * @param from - origin module
	 * @param to - destination module
	 * @param opts
	 * 	worldwin
	 */
	this.change = function(from, to, opts) {
		if (this.locked()) {
			return false;
		} else {
			this.lock();
		}

		opts = opts || {};
		var worlds = this.worlds, game = this.game;

		if (from === "worlds" && to === "game") {
			this._adventureMap.focusNodeById(this.currentLevel);
			this._adventureMap.getAdventureMapView().style.visible = true;

			this.removeSubview(worlds);
			this.background.style.visible = false;
			this.unlock();
			//this.addSubview(this._adventureMap.getAdventureMapView());
			//this._adventureMap.getAdventureMapView().style.visible = true;

			/*game.style.opacity = 1;
			this.addSubview(game);

			game.start({});
			game.enterTransition(bind(this, function() {
				this.removeSubview(worlds);
				this.background.style.visible = false;
				this.unlock();
			}));*/
		} else if (from === "game" && to === "map") {
			this.background.style.visible = false;
			
			var map = this._adventureMap.getAdventureMapView();
			map.focusNodeById(this.currentLevel);
			map.style.visible = true;

			animate(game.curtain)
			.now({ y: -BG_HEIGHT }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				game.close();
				this.unlock();
			}));
			
		} else if (from === "game" && to === "worlds") {
			animate(game.game)
			.now({ opacity: 0 }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				worlds.select();
				this.background.style.visible = true;
				this.addSubview(worlds);

				//animate(game.curtain)
				//.now({ y: -BG_HEIGHT }, ANIM_TIME, animate.easeIn)
				//.then(bind(this, function() {
					game.close();
					this.unlock();
				//}));
			}));
		} else if (from === "character" && to === "worlds") {
			animate(this.character)
			.now({ opacity: 0 }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				//worlds.select();

				this.addSubview(worlds);

				this.removeSubview(this.character);
				this.unlock();
			}));
		} else if (from === "game" && (to === "win" || to === "lose")) {
			var end = this[to];
			this.addSubview(end);

			animate(game)
			.now({ opacity: 0 }, ANIM_TIME, animate.easeIn)
			.then(bind(this, function() {
				game.close();

				if (to === "win") {
					end.worldwin = opts.worldwin;
					end.goldFound = opts.goldFound;
					end.goldFoundText.setText("+ " + opts.goldFound);
					end.specialsFound = opts.specialsFound;
					if (opts.specialsFound.length > 0) {
						end.showDiscoveryView();	
					}
					
					soundManager.play('win');
				} else {
					end.loseText.setText(opts.message);
					end.update();
					soundManager.play('lose');
				}

				if (typeof end.enterTransition === 'function') {
					end.enterTransition();
				}

				this.unlock();
			}));
		} else if (from === "win" || from === "lose") {
			var end = this[from];

			if (to === "worlds") {
				this.background.style.visible = true;
				end.leaveTransition(bind(this, function() {
					worlds.style.opacity = 0;
					worlds.select();
					this.addSubview(worlds);

					animate(worlds)
					.now({ opacity: 1 }, ANIM_TIME, animate.easeIn)
					.then(bind(this, function() {
						this.removeSubview(end);
						end.resetView();
						this.unlock();
					}));
				}));
			} else if (to === "worldswin") {
				this.background.style.visible = true;

				animate(end)
				.now({ opacity: 0 }, 2 * ANIM_TIME, animate.linear)
				.then(bind(this, function() {
					this.removeSubview(end);
					end.resetView();
					end.style.opacity = 1;
					worlds.style.opacity = 0;
					this.addSubview(worlds);

					animate(worlds)
					.now({ opacity: 1 }, 2 * ANIM_TIME, animate.easeIn)
					.then(bind(this, function() {
						end.resetView();
						worlds.unlockWorld();
					}));
				}));
			} else if (to === "game") {
				end.leaveTransition(bind(this, function() {
					game.start(merge(opts || {}, {
						cb: bind(this, function() {
							game.style.opacity = 0;
							game.inView.style.visible = true;
							game.inView.style.opacity = 1;
							this.addSubview(game);

							animate(game)
							.now({ opacity: 1 })
							.then(bind(this, function() {
								this.removeSubview(end);
								end.resetView();
								this.unlock();
							}));
						})
					}));
				}), { fade: false });
			} else if (to === "map") {
				this.background.style.visible = true;
				end.leaveTransition(bind(this, function() {
					var map = this._adventureMap.getAdventureMapView();
					map.style.opacity = 0;
					map.style.visible = true;

					animate(map)
					.now({ opacity: 1 }, ANIM_TIME, animate.easeIn)
					.then(bind(this, function() {
						this.removeSubview(end);
						end.resetView();
						this.unlock();

						var world = Data.getItem('worlds')[this.game.world];
						
						if (world.unlocked > this.levelUnlocked) {
							this.levelUnlocked = world.unlocked;
							this.movePlayer(world.unlocked);	
						}
						
					}));
				}));
			}
		}
	};
});
