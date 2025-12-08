import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	webpack(config) {
		// Configure how to handle SVG files
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})

		return config
	},
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
}

export default nextConfig
