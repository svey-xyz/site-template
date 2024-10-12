/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: false,
	images: {
		domains: ["cdn.sanity.io"]
	}
}

module.exports = nextConfig
