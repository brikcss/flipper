// https://github.com/michael-ciniawsky/postcss-load-config


// eslint-disable-next-line
module.exports = (context) => {
	// This config was created solely for linting via postcss-cli. We also run postcss inside of `scripts/sass-compile.js`, but that does not use this config.
	const isProd = context.env === 'production' || process.env.NODE_ENV === 'production';

	return {
		map: context.options.map,
		plugins: [
			require('stylelint')(),
			require('postcss-reporter')({
				clearReportedMessages: true,
				throwError: isProd
			})
		],
		syntax: require('postcss-scss')
	};
};
