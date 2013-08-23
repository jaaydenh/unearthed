var g  = 'goblin';
var o  = 'ogre';
var c  = 'goldcoin';
var b  = 'goblinberries';
var k  = 'key';
var h  = 'heart';
var m  = 'moon';
var s  = 'sun';
var r  = 'rock';
var w  = 'witch';
var tr = 'trap';
var d  = 'door';
var rb = 'rabbit';
var dg = 'dog';
var p  = 'path';
var l  = 'lost';
var ca = 'campfire'
var si = 'sign';
var f  = 'flowers';
var st = 'store';
var sf = 'singingflower';
var x  = null;

exports.list = ["forest", "darkforest"];

// build array of tiles with least restrictive tiles put on bottom of array (to the left) and most restrictive tiles 
// on top of array (to the right) so they will be popped first
exports["forest"] = [
	[
		{
			levelNumber: 1,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'You are lost in the goblin forest! Find the traveler\'s portal.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 0,
			backgroundImage: 'dirtstonebackground'
		},
		// tile deck, real deck for level 1
		[r,r,r,r,r,r,r,r,d,r,r,r,r,r,r,r,r,f,f,f,f,f,f,c,c,c,c,c,c,c,c,si,si,si,o,o,o,g,g],
		// debug tile deck for level 1
		//[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,si,si,st,st,st,st,st,o,o,o,o,o,o,o,o,o,o,g,g,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 2,
			isDaytime: true,
			keysToWin: 0, 
			goalTiles: [c,c,c,c],
			goalText: 'The goblins have carelessly dropped gold all over the forest. Collect 4 gold coins',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtstonebackground'
		},
		[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,f,f,f,f,f,g,o,o,o,si,si,si,l,l,c,c,c,c,c,c,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 3,
			isDaytime: true,
			keysToWin: 1,
			goalTiles: [d],
			goalText: 'Find and unlock the traveler\'s portal',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtstonebackground'
		},
		[r,c,r,c,r,c,r,d,r,r,r,r,r,si,si,si,f,f,f,c,c,c,c,c,c,o,o,o,g,g,r,r,r,r,r,r,l,l,k],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 4,
			isDaytime: true,
			keysToWin: 1,
			goalTiles: [d],
			goalText: 'The goblins have discovered you in their forest. Find the traveler\'s portal before 3 goblins find you',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground'
		},
		[r,r,r,c,r,c,r,c,r,k,r,r,r,r,r,r,r,si,si,f,f,c,c,c,c,c,c,g,g,g,g,g,g,o,o,o,ca,ca,l,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 5,
			isDaytime: true,
			keysToWin: 3,
			goalTiles: [d],
			goalText: 'The goblins have put extra locks on the traveler\'s portal. Find a way to open it.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground'
		},
		[r,c,r,c,r,c,r,k,r,r,k,k,k,r,r,r,r,r,r,r,c,c,c,c,c,c,si,si,f,f,o,o,o,ca,ca,l,g,g,g,g,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 6,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [dg],
			goalText: 'Your dog has been captured by goblins. Rescue your dog.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,c,c,c,c,si,si,f,f,o,o,o,sf,sf,ca,ca,ca,st,l,l,tr,tr,g,g,p,p,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 7,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,c,c,c,c,si,f,f,o,o,o,o,tr,sf,sf,ca,ca,ca,l,st,w,g,g,g,p,p,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 8,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,c,c,r,r,r,c,c,c,c,si,f,f,o,o,o,o,sf,ca,ca,ca,l,st,w,tr,tr,g,g,g,p,p,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 9,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,c,c,r,r,r,c,c,c,c,c,si,f,f,o,o,o,o,ca,sf,ca,ca,l,st,w,tr,tr,g,g,g,p,p,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 10,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,c,c,c,c,si,f,f,o,o,o,o,ca,ca,ca,l,st,w,tr,tr,g,g,g,p,p,p,d],
		[ca,ca,ca,ca,ca]
	]
];

exports["darkforest"] = [
	[
		{
			levelNumber: 1,
			isDaytime: false,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[r,r,r,r,r,r,d,k,k,c,c,s,g,g,g,g,b,b,w,tr,o,o,o,st,r,r,r,r,r,r,r,r,r,r,r,g,b,g],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 2,
			isDaytime: false,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 4,
			backgroundImage: 'swampbackground'
		},
		[r,r,r,r,r,r,d,k,k,c,c,s,g,g,g,g,b,b,w,tr,o,o,o,st,r,r,r,r,r,r,r,r,r,r,r,g,b,g],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 3,
			isDaytime: false,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'Find the traveler\'s portal',
			pathsNeeded: 3,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 4,
			backgroundImage: 'swampbackground'
		},
		[r,r,r,r,r,r,d,k,k,c,c,s,g,g,g,g,b,b,w,tr,o,o,o,r,st,r,r,r,r,r,r,r,r,r,r,g,b,g],
		[ca,ca,ca,ca,ca]
	]
];