var path = require('path')
var webpack = require('webpack')

var utils = require('./utils')
var config = require('../config')

module.exports = {
	entry: ["vue", "vue-resource", "vue-router",'mint-ui','crypto-js'],
	output: {
		filename: "vendor.js", // best use [hash] here too
		path:path.join(config.build.assetsRoot),
		library: "vendor_lib_[hash]",
		libraryTarget: 'umd',
    	umdNamedDefine: true
	},
	plugins: [
		new webpack.DllPlugin({
			name: "vendor_lib_[hash]",
			path:  path.join(__dirname, "..","dist","vendor-manifest.json"),
			context:__dirname
		}),
        new webpack.optimize.UglifyJsPlugin()
	]
};