const fs = require('fs');
const path = require('path');

const readFileSync = (url) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, url)).toString());
}

// 将获取到的参数转换了一下，变成key value的形式
const getArgv = () => {
    const argv = process.argv;
    if (argv.length <= 2) {
        return {};
    }
    const keyMap = {};
    let commandKey = argv[2].indexOf('-') === 0 ? '' : argv[2];
    if (argv.length >= 3) {
        for(let i = 2; i < argv.length; i++) {
            if (argv[i].indexOf('--') === 0 || argv[i].indexOf('-') === 0) {
                keyMap[argv[i]] = argv[i+1] ? 
                    /^\-|\-\-/.test(argv[i+1]) ? 
                        '' : 
                        argv[i+1] :
                    '';
            } else {
                keyMap[argv[i]] = '';
            }
        }
    }
    return {
        keyMap,
        commandKey
    };
}

const getProgramName = (url) => {
    const urlArr = url.split('/');
    const lastName = urlArr[urlArr.length - 1].split('.')[0];
    return lastName;
}

module.exports = {
    readFileSync,
    getArgv,
    getProgramName
}