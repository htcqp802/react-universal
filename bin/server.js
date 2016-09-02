require('../server.babel');
var path = require('path');
var rootDir = path.resolve(__dirname, '..');

//是否为client端
global.__CLIENT__ = false;
//是否为server端
global.__SERVER__ = true;
//判断运行环境
global.__DEVELOPMENT__ = process.env.NODE_ENV !== 'production';


//服务器热部署
if (__DEVELOPMENT__) {
    if (!require('piping')({
            hook: true,
            ignore: /(\/\.|~$|\.json|\.scss$)/i
        })) {
        return;
    }
}


var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
//为了提取出react中的资源文件 生成路径映射
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../webpack/webpack-isomorphic-tools'))
    .development(__DEVELOPMENT__)
    .server(rootDir, function () {
       require('../src/server');
    });

