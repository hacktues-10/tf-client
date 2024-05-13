import './env.mjs';

/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	swcMinify: true,
	optimizeFonts: false,
	experimental: {
		serverActions: true,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'pub-40c3b6cf3326458d9e34b64cd71f902c.r2.dev',
				port: '',
				pathname: '/**',
			},
		],
	},
	redirects: async () => {
		return [
			{
				source: '/vote',
				destination: '/projects',
				permanent: false,
			},
		];
	},
};
