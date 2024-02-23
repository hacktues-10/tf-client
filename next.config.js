/** @type {import('next').NextConfig} */
const path = require('node:path');
const nextConfig = {
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

module.exports = nextConfig;
