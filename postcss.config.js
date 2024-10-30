const { join } = require('path');

// interface PostCSSConfig {
// 	plugins: {
// 		[key: string]: Record<string, unknown>;
// 	};
// }

module.exports = {
	plugins: {
		'postcss-import': {},
		'tailwindcss/nesting': {},
		tailwindcss: {
			config: join(__dirname, 'tailwind.config.ts'),
		},
		autoprefixer: {},
	},
}

// export default PostCSSConfig