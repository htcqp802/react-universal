const fontAwesomeConfig = {
    styles: {
        mixins: true,
        core: true,
        icons: true,
        larger: true,
        path: true,
        animated: true,
    }
};


const ExtractTextPlugin = require('extract-text-webpack-plugin');
fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
module.exports = fontAwesomeConfig;

