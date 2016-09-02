const antdConfig = require('./antd.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
antdConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
module.exports = antdConfig;