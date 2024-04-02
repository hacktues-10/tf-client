/** @type {import('next').NextConfig} */
const path = require('node:path');
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	optimizeFonts: false,
	experimental: {
		serverActions: true,
	},
};

module.exports = nextConfig;
