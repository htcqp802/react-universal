module.exports = function () {

}

module.exports.pitch = function (remainingRequest) {
    var result;
    var styleLoader;
    var config;
    var msg;

    var configFilePath = this.resourcePath || remainingRequest;
    this.cacheable(true);
    if (!configFilePath || configFilePath.trim() === '') {
        msg = 'antd-less-loader缺少配置文件,在webpack中引用 antd-less-loader!./antd.config.js';
        console.error('ERROR: ' + msg);
        throw new Error(msg);
    }

    config = require(configFilePath);
    styleLoader = config.styleLoader || 'style-loader!css-loader!less-loader';
    result = 'require(' + JSON.stringify('-!' + styleLoader + '!' +
            require.resolve('./antd-less-styles.loader.js') + '!' + configFilePath) + ');';
    return result;
}