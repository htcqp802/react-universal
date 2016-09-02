var fs = require('fs');
var path = require('path');


function pathNotFound() {
    console.error('ERROR: ' + 'antd模块没找着');
    throw new Error('ERROR: ' + 'antd模块没找着');
}

function createTestParentPath(configPath, nLevelsUp) {
    var parentPath;
    var i;
    var levelsUp = configPath;
    for (i = 0; i < nLevelsUp; i++) {
        levelsUp += '/..';
    }
    parentPath = path.resolve(levelsUp);
    if (parentPath === '/') {
        pathNotFound();
    }

    return path.resolve(path.join(levelsUp, 'node_modules', 'antd'));
}

module.exports = {
    getPath: function (configPath) {
        var antdLessParentPath;
        var i = 0;
        do {
            antdLessParentPath = createTestParentPath(configPath, i);
            i += 1;
        } while (!fs.existsSync(antdLessParentPath) && i < 10);
        if (i === 10) {
            pathNotFound();
        }
        return path.join(antdLessParentPath, 'lib');
    }
}