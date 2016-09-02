/**
 * 注册babel
 */
var fs = require('fs');

var babelrc = fs.readFileSync('./package.json');
var config;

try {
    config = JSON.parse(babelrc).babel;
} catch (err) {
    console.error('==>     ERROR: .babelrc. 转JSON错误');
    console.error(err);
}
require('babel-register')(config);
