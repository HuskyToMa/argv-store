const fs = require('fs');
const path = require('path');
const argvStore = require('./index');

const program = new argvStore();

const readFileSync = (url) => {
    return JSON.parse(fs.readFileSync(path.resolve(__dirname, url)).toString());
}
const packageJson = readFileSync('./package.json');

const init = function() {
    console.log(this.argvs);
}

program
    .version(packageJson.version)
    .command('react', '初始化', init)
    .options('-r --rename', '重命名')
    .parse();