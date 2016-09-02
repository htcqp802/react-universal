require('babel-polyfill');
var path = require('path');
var strip = require('strip-loader');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var config = require('../config/production');
var projectRootPath = path.resolve(__dirname, '../');
var time = new Date().getTime();
var assetsPath = path.resolve(projectRootPath, './dist/');

var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));


module.exports = {
    //输出source map 到output目录
    devtool: 'source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            './src/client.js',
            'font-awesome-webpack!./src/theme/font-awesome.config.js',
            './src/theme/antd-less-loader!./src/theme/antd.config.prod.js',
            './src/theme/reset.less'
        ]
    },
    output: {
        path: assetsPath + '/' + time + '/',
        filename: '[name]-[chunkhash].js',
        //关联模块名
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: config.staticPrefix.static + time + '/'

    },
    module: {
        loaders: [
            {test: /\.jsx?$/, exclude: /node_modules/, loaders: [strip.loader('debug'), 'babel']},
            {test: /\.json$/, loader: 'json-loader'},
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!less?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
            },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
            {test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240'}
        ],
        postLoaders: [
            {test: /\.jsx?$/, loaders: ['es3ify']},
        ]
    },
    progress: true,
    //解析目录
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        new CleanPlugin([assetsPath], {root: projectRootPath}),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },

            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: false,
            __DEVTOOLS__: false
        }),
        new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        webpackIsomorphicToolsPlugin
    ]
}
