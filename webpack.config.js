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
const path = require('path');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const libraryName = 'flipper';

/**
 * Set up configuration export.
 * @method
 * @param   {string}  env  NODE_ENV variable.
 * @return  {object|array}  Webpack configuration(s).
 */
module.exports = (env = {}) => {
	// env defaults to `process.env.NODE_ENV`, but can accept webpack's env argument as a backup.
	env.NODE_ENV = process.env.NODE_ENV || env.NODE_ENV || 'dev';
	/**
	 * Set up configurations for each flavor.
	 */
	let vanillaConfig = setupConfig('vanilla', env);
	let angularConfig = setupConfig('angularjs', env, {
		entry: {
			angularjs: './src/js/angularjs/index.js'
		}
	});
	delete angularConfig.output.library;
	delete angularConfig.output.libraryTarget;

	// Return all configs.
	return [vanillaConfig, angularConfig];
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
	// Merge config objects.
	config = Object.assign({
		entry: {
			vanilla: `./src/js/vanilla/${libraryName}.js`
		},
		output: {
			path: path.resolve(__dirname, 'dist/js/' + flavor),
			filename: `${libraryName}-[name].js`, // [name] and [chunkhash] are available.
			// publicPath: '', // url to output directory resolved relative to the HTML page.
			library: libraryName, // name of the exported library.
			libraryTarget: 'umd', // type of exported library.
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
					}, {
						loader: 'eslint-loader',
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
	if (env.NODE_ENV === 'production') {
		// Add .min to file extension for minified file.
		config.output.filename =
			path.basename(config.output.filename, path.extname(config.output.filename)) +
			'.min' +
			path.extname(config.output.filename);
		// Add plugin to minify the file.
		config.plugins.push(
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
			)
		);
	} else {
		// Add source maps.
		config.devtool = 'source-map';
	}

	return config;
}
