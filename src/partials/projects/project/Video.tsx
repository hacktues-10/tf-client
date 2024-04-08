'use client';

import { youtubeParse } from '@/utils/youtubeParser';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

const Video = ({ name, id }: { name: string; id: string }) => {

	if (!id)
		return (
			<p className="flex h-full w-full items-center justify-center bg-gradient bg-clip-text text-4xl font-black text-transparent">
				{'няма видео :('}
			</p>
		);

	return <LiteYouTubeEmbed id={id} title={`${name} | TUES Fest 2024`} poster="hqdefault"/>;
};

export default Video;
