import './env.mjs';

/** @type {import('next').NextConfig} */
export default {
	reactStrictMode: true,
	swcMinify: true,
	optimizeFonts: false,
	experimental: {
		serverActions: true,
	},
};
