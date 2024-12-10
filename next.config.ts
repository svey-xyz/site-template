import { NextConfig } from 'next';


const nextConfig: NextConfig = {
	images: {
		domains: ["cdn.sanity.io"]
	},
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ["@svgr/webpack"]
		});
		
		return config;
	}
}

export default nextConfig