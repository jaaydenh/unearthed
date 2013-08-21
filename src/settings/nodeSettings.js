import adventuremap.views.tiles.status.LabelView as LabelView;
import ..views.MapPlayerView as MapPlayerView;

import .characterSettings;

exports = {
	nodes: [
		{
			image: 'resources/images/node/grayButton.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/topButton.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/midButton.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/lowButton.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/topButtonDone.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/midButtonDone.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		},
		{
			image: 'resources/images/node/lowButtonDone.png',
			width: 220,
			height: 220,
			characterSettings: {
				height: 60,
				data: characterSettings.numbers
			}
		}
	],
	itemCtors: {
		Label: LabelView,
		Player: MapPlayerView
	}
};
