/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		return config;
	},
	experimental: {
		esmExternals: 'loose'
	},
};

export default nextConfig;
