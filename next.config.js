/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: { urlImports: ['https://themer.sanity.build/'] },
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

module.exports = nextConfig