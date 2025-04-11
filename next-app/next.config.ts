import { NextConfig } from 'next';


const nextConfig: NextConfig = {
	transpilePackages: ['web-theme-kit'],
	images: {
		domains: ["cdn.sanity.io"]
	},
	env: {
		// Matches the behavior of `sanity dev` which sets styled-components to use the fastest way of inserting CSS rules in both dev and production. It's default behavior is to disable it in dev mode.
		SC_DISABLE_SPEEDY: "false",
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