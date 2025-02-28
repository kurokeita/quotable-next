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
	// Configure Turbopack for SVG imports
	experimental: {
		turbo: {
			rules: {
				'*.svg': {
					loaders: ['@svgr/webpack'],
					as: 'react',
				},
			},
		},
	},
}

export default nextConfig
