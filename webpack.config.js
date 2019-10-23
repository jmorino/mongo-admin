'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const SRC_PATH = path.resolve(__dirname, 'src/client');
const STATIC_PATH = path.resolve(__dirname, 'public');
const BUILD_PATH = path.resolve(__dirname, 'dist/static');


module.exports = {
	// GENERAL CONFIG
	//
	mode: process.env.NODE_ENV || 'development',
	entry: path.resolve(SRC_PATH, 'index.js'),
	output: {
		filename: 'app.js',
		path: BUILD_PATH,
		publicPath: '/',
	},
	resolve: {
		alias: {
			'@': SRC_PATH,
		},
	},
	module: {
		rules: [{
			// images
			test: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'img/[name].[hash:8].[ext]',
				},
			}]
		}, {
			// fonts
			test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
			use: [{
				loader: 'file-loader',
				options: {
					name: 'fonts/[name].[hash:8].[ext]',
				},
			}]
		}, {
			// Vue components
			test: /\.vue$/,
			loader: 'vue-loader',
		}, {
			// LESS files
			test: /\.less$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'less-loader',
			]
		}, {
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader',
			]
		}],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(STATIC_PATH, 'index.html'),
		}),
		new CopyWebpackPlugin([{
			from: STATIC_PATH,
			to: BUILD_PATH,
			toType: 'dir',
			ignore: ['.DS_Store']
		}]),
		new VueLoaderPlugin(),
	],

	// DEV CONFIG
	//
	devtool: 'inline-source-map',
	devServer: {
		open: false,
		port: 8080,
		contentBase: BUILD_PATH,
		compress: true,
		hot: true,
		liveReload: false,
		overlay: true,
	},
};
