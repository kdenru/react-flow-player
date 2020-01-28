import { noop } from './noop';
const initFlowPlayerSetup = props => {
	const {
		adaptiveRatio,
		aspectRatio,
		autoplay,
		bgcolor,
		title,
		description,
		muted,
		loop,
		preload,
		sources,
		subtitles,
		fullscreen,
		keyboard,
		live,
		poster,
		rtmp,
		speeds,
		volume,
		onError,
		onResume,
		onFinish,
		licenseKey,
		logo,
		hlsQualities,
		splash,
		hlsjs,
		defaultQuality,
		qualities,
		vodQualities,
		vastConfig,
		analytics,
	} = props;
	const config = {
		clip: {
			sources,
			title,
		},
		adaptiveRatio,
		aspectRatio,
		autoplay,
		description,
		muted,
		loop,
		preload,
		bgcolor,
		fullscreen,
		keyboard,
		live,
		poster,
		rtmp,
		speeds,
		volume,
		hlsQualities,
		splash,
		hlsjs,
		ima: vastConfig,
		analytics,
	};
	if (defaultQuality) {
		Object.assign(config.clip, { defaultQuality });
	}

	if (qualities) {
		Object.assign(config.clip, { qualities });
	}

	if (vodQualities) {
		Object.assign(config.clip, { vodQualities });
	}

	if (subtitles && subtitles.length > 0) {
		Object.assign(config.clip, { subtitles });
	}

	if (licenseKey && licenseKey.length > 0) {
		config.key = licenseKey;
		if (logo && ((typeof logo === 'object' && (Object.keys(logo) || []).length > 0) || (typeof logo === 'string' && logo.length > 0))) {
			config.logo = logo;
		}
	}

	const player = window.flowplayer(`#${props.playerId}`, config);
	if (player) {
		player
			.on('resume', onResume)
			.on('finish', onFinish)
			.on('error', onError);
		const intervalBreak = setInterval(function(){
			const item = document.getElementsByClassName('fp-controls');
			if (item) {
				(props.onLoad || noop)();
				clearInterval(intervalBreak);
			}
		}, 100);
	}
};

export default initFlowPlayerSetup;
