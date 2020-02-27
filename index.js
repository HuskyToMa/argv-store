const chalk = require('chalk');
const { getArgv } = require('./util');

let store;

function argvStore() {

    if (store) {
        return store;
    }

    this.ver = '';
    this.argvs = {};
    this.opts = {
        '-h': {
            description: '帮助',
            param: null,
            callback: this.showHelp
        },
        '--help': {
            description: '帮助',
            param: null,
            callback: this.showHelp
        }
    };
    this.helpInfo = {
        '-h --help' : '帮助文档',
        '-V --version': '获取当前版本信息'
    };
    this.currentCommand = null;
    this.commandCache = {

    }
    store = this;
}

argvStore.prototype.options = function(type, description) {

    const types = type.split(' ');
    if (types.length <= 1) {
        throw new Error(chalk.red('选项类型书写格式不正确，请重新编写'));
    }

    types.map(item => {

        if (this.currentCommand) {
            this.currentCommand.options[item] = {
                description,
            }
            this.currentCommand.helpInfo[type] = description;
        } else {
            throw new Error(chalk.red('不能执行此操作，options前必须存在command'))
        }
    })

    return this;
}

argvStore.prototype.command = function(type, description, cb) {
    if (!type) {
        throw new Error(chalk.red('你输入的command有误，请重新输入'))
    }
    this.commandCache[type] = {
        description,
        options: {},
        helpInfo: {},
        callback: cb
    }
    this.currentCommand = this.commandCache[type];
    return this;
}

argvStore.prototype.version = function(str) {
    this.ver = str;
    this.opts['-V'] = this.opts['--version'] = {
        description: '版本号',
        param: str,
        callback: this.getVersion
    }
    return this;
}

argvStore.prototype.parse = function() {
    this.argvs = getArgv();
    if (Object.keys(this.argvs).length === 0) {
        this.opts['-h'].callback.call(this);
        return ;
    }
    const { commandKey } = this.argvs;
    if (commandKey) {
        const cmd = this.commandCache[commandKey];
        if (cmd) {
            cmd.callback.call(this);
        } else {
            throw new Error(chalk.red(`不存在此命令：${commandKey}`))
        }
    }
}

argvStore.prototype.showHelp = function() {
    console.log('使用方法：sy-cli [options]\n');
    console.log('options：');
    Object.keys(this.helpInfo).map(key => {
        console.log(`  ${key}  ${this.helpInfo[key]}`)
    })
    Object.keys(this.commandCache).map(key => {
        console.log(`  ${key}  ${this.commandCache[key].description}`)
        const op = this.commandCache[key].helpInfo;
        if (op) {
            Object.keys(op).map(k => {
                console.log(`    ${k}  ${op[k]}`)
            })
        }
    })
}

argvStore.prototype.getVersion = function() {
    console.log(this.ver);
}

module.exports = argvStore