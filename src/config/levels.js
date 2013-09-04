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
var ct = 'cat';
var cv = 'cave';
var sp = 'spider'
var x  = null;

exports.list = ["forest", "darkforest"];

// build array of tiles with least restrictive tiles put on bottom of array (to the left) and most restrictive tiles 
// on top of array (to the right) so they will be popped first
exports["forest"] = [
	[
		{
			levelNumber: 1,
			isDaytime: false,
			keysToWin: 0,
			goalTiles: [d],
			goalText: 'You are lost in the goblin forest! Find the traveler\'s portal.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 0,
			backgroundImage: 'dirtstonebackground',
			caveTiles: [o,g,w]
		},
		// tile deck, real deck for level 1
		[r,r,r,r,r,r,r,r,r,d,r,r,r,r,r,r,r,r,r,f,f,f,l,c,c,c,c,c,c,c,c,si,sp,sp,sp,o,o,g,g],
		// debug tile deck for level 1
		//[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,c,c,c,c,c,c,c,c,c,c,c,c,c,c,st,st,st,st,st,st,st,st,st,st,cv,o,o,g,g,p,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 2,
			isDaytime: false,
			keysToWin: 0, 
			goalTiles: [c,c,c,c,d],
			goalText: 'The goblins have carelessly dropped gold all over the forest. Collect 4 gold coins',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtstonebackground',
			caveTiles: [o,g,c]
		},
		[r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,f,f,f,f,f,g,o,o,o,si,sp,sp,l,l,c,c,c,c,c,c,cv,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 3,
			isDaytime: false,
			keysToWin: 1,
			goalTiles: [d],
			goalText: 'Find and unlock the traveler\'s portal',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtstonebackground',
			caveTiles: [o,g,c]
		},
		[r,c,r,c,r,c,r,d,r,r,si,si,sp,sp,sp,f,f,f,c,c,c,c,c,c,o,o,o,g,g,r,r,r,r,r,r,l,cv,k],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 4,
			isDaytime: false,
			keysToWin: 0,
			goalTiles: [dg,d],
			goalText: 'Your dog has been captured by goblins. Rescue your dog.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground',
			caveTiles: [o,g,c]
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,r,r,r,c,c,c,c,c,c,si,sp,f,f,o,o,o,sf,sf,ca,ca,st,l,l,g,g,cv,d,dg],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 5,
			isDaytime: false,
			keysToWin: 1,
			goalTiles: [d],
			goalText: 'The goblins have discovered you in their forest. Find the traveler\'s portal before 3 goblins find you',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground',
			caveTiles: [o,g,w,c]
		},
		[r,r,r,c,r,c,r,c,r,k,r,r,r,r,r,r,r,si,sp,f,f,c,c,c,c,c,c,g,g,g,g,g,g,o,o,o,ca,ca,l,cv,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 6,
			isDaytime: true,
			keysToWin: 3,
			goalTiles: [d],
			goalText: 'The goblins have put extra locks on the traveler\'s portal. Find a way to open it.',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground',
			caveTiles: [o,g,w,c]
		},
		[r,c,r,c,r,c,r,k,r,r,k,k,k,r,r,r,r,r,r,r,c,c,c,c,c,c,sp,si,f,f,o,o,o,ca,ca,l,g,g,g,g,cv,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 7,
			isDaytime: true,
			keysToWin: 0,
			goalTiles: [d,rb],
			goalText: 'Rescue the lost rabbit',
			pathsNeeded: 0,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'dirtonlybackground',
			caveTiles: [o,g,w,c]
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,rb,r,r,r,r,r,c,c,c,c,c,c,si,f,f,o,o,o,o,tr,sf,sp,sp,sp,l,st,w,g,g,g,cv,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 8,
			isDaytime: false,
			keysToWin: 1,
			goalTiles: [d],
			goalText: 'Escape the gauntlet of ogres!!!',
			pathsNeeded: 0,
			hearts: 3,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,r,r,r,k,r,r,c,c,c,c,c,c,c,si,f,o,o,o,o,o,o,sp,sp,l,st,w,tr,g,g,g,s,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 9,
			isDaytime: false,
			keysToWin: 1,
			goalTiles: [d,ct],
			goalText: 'Find the mysterious cat',
			pathsNeeded: 0,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,r,c,c,c,c,c,c,si,si,f,f,o,o,o,sp,sp,sf,l,g,g,g,k,ct,d],
		[ca,ca,ca,ca,ca]
	], [
		{
			levelNumber: 10,
			isDaytime: true,
			keysToWin: 2,
			goalTiles: [d],
			goalText: 'Navigate the enclave of witches',
			pathsNeeded: 3,
			hearts: 4,
			gridWidth: 6,
			gridHeight: 5,
			startingRunes: 3,
			backgroundImage: 'swampbackground'
		},
		[c,c,c,c,r,r,r,r,r,r,r,r,r,r,r,r,c,c,c,c,si,f,f,o,o,o,o,sp,l,st,w,w,w,w,w,w,w,g,g,g,k,k,d],
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