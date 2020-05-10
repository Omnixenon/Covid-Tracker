const SriPlugin = require('webpack-subresource-integrity')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const ROOT = process.cwd()
const SRC = path.resolve(ROOT, 'src/client')
const BUILD = path.resolve(ROOT, 'build/client')
const PRODUCTION = process.env.NODE_ENV === 'production'

console.log(PRODUCTION)

const plugins = [
	new webpack.NamedModulesPlugin(),
	new webpack.NoEmitOnErrorsPlugin(),
	new webpack.EnvironmentPlugin({
		BUILD_STAGE: 'production'
	})
]

if (PRODUCTION) {
	plugins.unshift(
		new CleanWebpackPlugin(),
		new MiniCSSExtractPlugin({
			allChunks: true,
			filename: '[name].[chunkhash].css'
		})
	)
	plugins.push(
		new SriPlugin({
			hashFuncNames: ['sha512'],
			enabled: true
		})
	)
} else {
	plugins.unshift(
		new webpack.HotModuleReplacementPlugin()
	)
}

const cssModules =
  [
  	[/src\/client\/js/, true, /\.scss$/, 'sass'],
  	[/src\/client\/scss/, false, /\.scss$/, 'sass'],
  	[/node_modules/, false, /\.scss$/, 'sass'],
  	[/node_modules/, false, /\.css$/, 'css']
  ].map(([include, modules, test, loader]) => {
  	const config = [{
  		loader: 'css-loader',
  		options: {
  			modules,
  			sourceMap: true
  		}
  	}]

  	if (!PRODUCTION) {
  		config.unshift('style-loader')
  	}

  	if (loader !== 'css') {
  		const preprocessors = [{
  			loader: 'postcss-loader',
  			options: {
  				modules,
  				sourceMap: true,
  				plugins: (loader) => [
  					require('postcss-cssnext')()
  				]
  			}
  		}, 'resolve-url-loader', {
  			loader: `${loader}-loader`,
  			options: {
  				sourceMap: true
  			}
  		}, {
  			loader: 'sass-resources-loader',
  			options: {
  				resources: `${SRC}/scss/util/common.scss`
  			}
  		}]

  		config.push(...preprocessors)
  	}

  	return {
  		include,
  		test,
  		use: PRODUCTION ? [MiniCSSExtractPlugin.loader, ...config] : config
  	}
  })

const devModules = PRODUCTION ? ['react-hot-loader/patch'] : []

module.exports = {
	context: SRC,
	entry: {
		app: [
			'core-js/stable',
			'regenerator-runtime/runtime',
			...devModules,
			'./js/app',
			'./scss/app'
		]
	},
	devtool: PRODUCTION ? false : 'source-map',
	module: {
		rules: [{
			test: /\.(eot|woff2?|ttf|svg)/,
			include: /font/,
			use: [{
				loader: 'file-loader',
				query: {
					name: 'asset/font/[name].[ext]?[hash]'
				}
			}]
		}, {
			test: /\.(jpg|png|svg|gif)/,
			include: /img/,
			use: [{
				loader: 'file-loader',
				query: {
					name: 'asset/img/[name].[ext]?[hash]'
				}
			}, 'img-loader']
		}, {
			test: /\.jsx?/,
			exclude: /node_modules\/(?!(qs|leven)\/).*/,
			use: ['babel-loader']
		}, {
			test: /\.yml$/,
			use: ['json-loader', 'yaml-loader']
		}, {
			test: /\.worker\.js$/,
			use: ['worker-loader', 'babel-loader']
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}].concat(cssModules)
	},
	output: {
		filename: '[name].[hash].js',
		chunkFilename: '[name].bundle.js',
		path: `${BUILD}`,
		publicPath: '/',
		globalObject: 'this',
		crossOriginLoading: 'anonymous'
	},
	mode: PRODUCTION ? 'production' : 'development',
	optimization: {
		minimizer: PRODUCTION ? [new TerserJSPlugin(), new OptimizeCSSAssetsPlugin()] : [],
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				css: {
					name: 'css',
					test: /\.(css|scss)$/,
					priority: -8
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		}
	},
	devServer: {
		contentBase: `${BUILD}/client/`,
		historyApiFallback: true,
		hot: true,
		hotOnly: true,
		open: true,
		disableHostCheck: true,
		inline: true,
		publicPath: '/',
		compress: true,
		http2: true,
		https: {
			key: path.resolve(ROOT, 'infrastructure/ssl-certs/localhost/key.pem'),
			cert: path.resolve(ROOT, 'infrastructure/ssl-certs/localhost/cert.pem')
		},
		port: 4000,
		proxy: {
			'/api': {
				target: 'https://localhost:3000',
				secure: false
			},
			'/auth': {
				target: 'https://localhost:3000',
				secure: false
			}
		}
	},
	resolve: {
		alias: {
			base: process.cwd(),
			action: `${SRC}/js/action`,
			config: `${SRC}/config`,
			constant: `${SRC}/js/constant`,
			data: `${SRC}/data`,
			font: `${SRC}/font`,
			helper: `${SRC}/js/helper`,
			html: `${SRC}/html`,
			img: `${SRC}/img`,
			js: `${SRC}/js`,
			json: `${SRC}/json`,
			scss: `${SRC}/scss`,
			view: `${SRC}/js/view`,
			component: `${SRC}/js/view/component`,
			page: `${SRC}/js/view/page`
		},
		extensions: ['.html', '.js', '.jsx', '.json', '.scss']
	},
	plugins: [
		new HTMLWebpackPlugin({
			hash: true,
			inject: false,
			minify: PRODUCTION ? {
				html5: true,
				collapseWhitespace: true
			} : false,
			template: './html',
			filename: 'index.html'
		}),
		...plugins
	]
}
