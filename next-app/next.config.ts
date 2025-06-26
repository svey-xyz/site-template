import { NextConfig } from 'next';


const nextConfig: NextConfig = {
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
	images: {
		domains: ["cdn.sanity.io"]
	},
}

export default nextConfig