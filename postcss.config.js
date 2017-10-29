// https://github.com/michael-ciniawsky/postcss-load-config

// eslint-disable-next-line
module.exports = (context) => {
	// By default, context.env === process.env.NODE_ENV and context.cwd === process.cwd().
	// We also have access to process.env.
	return {
		plugins: [
			// Edit target browsers in `.browserslistrc`.
			require('autoprefixer')({
				cascade: false
			})
		]
	};
};
