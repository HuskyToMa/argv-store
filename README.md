# argv_store

node命令行管理，操作参数以及对应的方法实现

## 使用

### 内部方法

|方法名|解释|参数|
|:-|:-:|-:|
|version|添加对应模块版本|version(string)|
|command|添加命令方法|(方法名， 解释信息， 调用方法)|
|options|添加命令的参数, 使用前必须存在command|（参数名， 解释信息）|
|parse|执行方法（必须调用）|null|

### code

``` javascript

const program = new argvStore();

const test = function() {
    // 获取到的输入的参数
    console.log(this.argv);
    // 直接获取keyMap，即option以及他对应的参数
    getKeyMap()
}

program
    .version(packageJson.version)
    .command('build', '构建', build)
    .options('-b --build', '构建参数')
    .options('-c --client', '构建参数', test)
    .command('dev', '开发', devServer)
    .parse();

```
