import './env.mjs';

/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	swcMinify: true,
	optimizeFonts: false,
	experimental: {
		serverActions: true,
	},
	async redirects() {
		return [
			{
				source: '/schedule',
				destination: '/#schedule',
				permanent: false,
			},
		];
	},
};
