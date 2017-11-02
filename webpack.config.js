/** ====================================================================
 * webpack.config.js
 * -----------------
 * @description Configuration for webpack js transpiler.
 * @credit Thanks to https://github.com/krasimir/webpack-library-starter for the library starter.
===================================================================== */


/**
 * Set up dependencies.
 */
const webpack = require('webpack');
const path = require('path-extra');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const libraryName = 'flipper';


/**
 * Set up configuration export.
 * @method
 * @param   {string}  env  NODE_ENV variable.
 * @return  {object|array}  Webpack configuration(s).
 */
module.exports = (env = {}) => {
	let configs = [];

	// env defaults to `process.env.NODE_ENV`, but can accept webpack's env argument as a backup.
	env.NODE_ENV = process.env.NODE_ENV || env.NODE_ENV || 'dev';
	env.isProd = env.NODE_ENV === 'production' || env.NODE_ENV === 'prod';
	/**
	 * Set up configurations for each flavor.
	 */
	// Create angular specific config.
	let angularConfig = {
		entry: {
			angularjs: './src/js/angularjs/index.js'
		}
	};
	// Run dev when env === 'prod' so we build dev and .min files.
	if (env.isProd) {
		configs.push(
			setupConfig('vanilla', 'dev'),
			setupConfig('angularjs', 'dev', angularConfig)
		);
	}
	configs.push(
		setupConfig('vanilla', env),
		setupConfig('angularjs', env, angularConfig)
	);
	// delete angularConfig.output.library;
	// delete angularConfig.output.libraryTarget;

	// Return all configs.
	return configs;
};


/**
 * Helper function to set up multiple configuration objects.
 * @method  setupConfig
 * @param   {string}  flavor  Flavor of bundle.
 * @param   {string}  env  NODE_ENV environment variable.
 * @param   {object}  config  Configuration to merge in.
 * @return  {object}  Configuration object.
 */
function setupConfig(flavor, env, config) {
	const pkg = require('./package.json');

	// Set up banner.
	let banner = [
		pkg.name + ' v' + pkg.version,
		'@filename <filename>',
		'@author ' + pkg.author,
		'@homepage ' + pkg.homepage,
		'@license ' + pkg.license,
		'@description ' + pkg.description,
	];

	// Merge config objects.
	config = Object.assign({
		entry: {
			vanilla: `./src/js/vanilla/${libraryName}.js`
		},
		output: {
			path: path.resolve(__dirname, 'dist/js/' + flavor),
			filename: `${libraryName}-[name].js`, // [name] and [chunkhash] are available.
			// publicPath: '', // url to output directory resolved relative to the HTML page.
			library: flavor === 'vanilla' ? libraryName : undefined, // name of the exported library.
			libraryTarget: flavor === 'vanilla' ? 'umd' : undefined, // type of exported library.
			// sourceMapFilename: 'sourcemaps/[file].js.map', // filename template of source map location.
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /(node_modules)/,
					use: [{
						loader: 'babel-loader',
						// options: {
						// 	preset: ['env']
						// }
					// }, {
					// 	loader: 'eslint-loader',
						// options: {}
					}]
				}
			]
			// script-loader?
			// mocha-loader? (testing)
			// coverjs-loader? (coverage)
		},
		plugins: [
			// CommonsChunkPlugin
			// BannerPlugin
			// BabelMinifyWebpackPlugin
			// HotModuleReplacementPlugin
			// HtmlWebpackPlugin
			// UglifyjsWebpackPlugin
		],
		resolve: {
			alias: {
				src: path.resolve(__dirname, 'src')
			}
		}
	}, config);

	// Add environment specific configuration.
	if (env.isProd) {
		// Add .min to file extension for minified file.
		config.output.filename = path.fileNameWithPostfix(config.output.filename, '.min');

		// Add plugins for prod environment.
		config.plugins.push(
			new webpack.BannerPlugin(banner.join(' | ').replace('<filename>', config.output.filename)),
			new UglifyJsPlugin(
				{
					parallel: {
						cache: true,
						workers: 2
					},
					uglifyOptions: {
						ecma: 6
					},
					sourceMap: true
				}
			),
		);
	} else {
		// Add source maps.
		config.devtool = 'source-map';

		// Add plugins for dev env.
		config.plugins.push(new webpack.BannerPlugin(banner.join('\n').replace('<filename>', config.output.filename)));
	}

	return config;
}
