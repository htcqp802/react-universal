require('babel-polyfill');

var fs = require("fs");
var path = require("path");
var webpack = require('webpack');

var config = require('../config/local');

var host = config.web.host;
var port = config.web.port+1;
var assetsPath = path.resolve(__dirname, '../dist');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
var webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(require('./webpack-isomorphic-tools'));

var babelrc = fs.readFileSync('./package.json');
var babelrcObject = {};

try {
    babelrcObject = JSON.parse(babelrc).babel;
} catch (err) {
    console.error('==>     ERROR: 解析 .babelrc. 出错');
    console.error(err);
}


var babelrcObjectDevelopment = babelrcObject.env && babelrcObject.env.development || {};

var combinedPlugins = babelrcObject.plugins || [];
//将所有插件(开发环境及生成环境)合并到一个数组中
combinedPlugins = combinedPlugins.concat(babelrcObjectDevelopment.plugins);
//添加presets,并合并为新的{}
var babelLoaderQuery = Object.assign({}, babelrcObjectDevelopment, babelrcObject, {plugins: combinedPlugins});
delete babelLoaderQuery.env;


//由于服务器端不需要HMR,所以这里将HMR加入插件列表,只提供给客户端使用

babelLoaderQuery.plugins = babelLoaderQuery.plugins || [];
var reactTransform = null;
//提取出reactTransform
for (var i = 0; i < babelLoaderQuery.plugins.length; ++i) {
    var plugin = babelLoaderQuery.plugins[i];
    if (Array.isArray(plugin) && plugin[0] === 'react-transform') {
        reactTransform = plugin;
    }
}
if (!reactTransform) {
    reactTransform = ['react-transform', {transforms: []}];
    babelLoaderQuery.plugins.push(reactTransform);
}

if (!reactTransform[1] || !reactTransform[1].transforms) {
    reactTransform[1] = Object.assign({}, reactTransform[1], {transforms: []});
}

reactTransform[1].transforms.push({
    transform: 'react-transform-hmr',
    imports: ['react'],
    locals: ['module']
});


//同生产环境类似,只是加入了客户端热部署
module.exports = {
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, '..'),
    entry: {
        'main': [
            'webpack-hot-middleware/client?path=http://' + host + ':' + port + '/__webpack_hmr',
            './src/client.js',
            'font-awesome-webpack!./src/theme/font-awesome.config.js',
            './src/theme/antd-less-loader!./src/theme/antd.config.js',
            './src/theme/reset.less',
        ]
    },
    output: {
        path: assetsPath,
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[chunkhash].js',
        publicPath: 'http://' + host + ':' + port + '/'
    },
    module: {
        
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?' + JSON.stringify(babelLoaderQuery), 'eslint-loader']},
            { test: /\.json$/, loader: 'json-loader' },
            { test: /\.less$/, loader: 'style!css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!autoprefixer?browsers=last 2 version!less' },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
            { test: webpackIsomorphicToolsPlugin.regular_expression('images'), loader: 'url-loader?limit=10240' }
        ],
        postLoaders:[
            {test: /\.jsx?$/, loaders:['es3ify']},
        ]
    },
    progress: true,
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.json', '.js', '.jsx']
    },
    plugins: [
        // hot reload
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin('[name]-[chunkhash].css', {allChunks: true}),
        new webpack.IgnorePlugin(/webpack-stats\.json$/),
        new webpack.DefinePlugin({
            __CLIENT__: true,
            __SERVER__: false,
            __DEVELOPMENT__: true,
            __DEVTOOLS__: true
        }),
        webpackIsomorphicToolsPlugin.development()
    ]
};