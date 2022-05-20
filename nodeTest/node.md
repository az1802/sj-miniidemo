# Node





### TODO 

* miniDemo整理

* RESTful的理解[维基百科参考](https://zh.wikipedia.org/wiki/%E8%A1%A8%E7%8E%B0%E5%B1%82%E7%8A%B6%E6%80%81%E8%BD%AC%E6%8D%A2)

* require(".")的使用
* require源码  模块加载流程
* file:../../commands/add 达到npm link的效果
* Object.create(null)没有原型链可以节约攻坚
* async 函数必须处理自己内部的await 指令后的错误 保证整个链条的逻辑完善性
* 全局未捕获异常的处理机制 process.on("uncaughtException",*err*=>{

    console.log('err: ',*err*.message);

  })

  process.on('unhandledRejection',*err*=>{

    console.log('err1',*err*.message)

  })

* fs文件系统的整理

* process.argv 第一个参数为node命令所在路径地址  第二个为文件名称  后续为传入的参数

* 项目开发时如何测试各种异常情况是否显示正常

### 管理node版本

1 利用node的n模块进行版本的管理
 * npm install -g n
 * n <version> 下载某版本的node
 * n latest 安装最新版本
 * n lts 安装最长期维护版本
 * n rm <version> 移除某个版本
 * n 切换版本

2 使用nvm进行版本管理



### node使用





### path模块

* reolve join 

### fs 模块

fs.existsSync,fs.accessSync 判断文件是否存在.使用path-exists判断文件路径是否存在.



### require

* [阮一峰require源码解读](https://www.ruanyifeng.com/blog/2015/05/require.html)

* [深入解析require源码](https://juejin.cn/post/7083291899821293581)
* [nodejs模块系统源码解析](https://www.jb51.net/article/211375.htm)
* [彻底搞懂 Node.js 中的 Require 机制(源码分析到手写实践)](https://blog.csdn.net/qiwoo_weekly/article/details/109523540)

1. 基本使用

​	require(X)

​    X内置模块则返回改模板

​	x以'./','../','./'开头则根据X所在父模块确定X的绝对路径然后加载

​	X当成目录则一次寻找package.json main字段.X/index.js,X/index.json.X/index.node

​	X当做模块名一次寻找可能的安装目录,找到之后进行加载.

​	require可以加载任何文件不是以js,json,node结尾会默认为js格式然后读取文件内容.进行执行,不是js内容就会产生报错.

2. 源码分析
   2.1 module对象
   每个文件都被视为一个独立的模块。模块被加载时，都会初始化为 Module 对象的实例.在运行代码的时候会传递这个module对象,exports对象,__dirName,__fileName进去.
    ```
    function Module(id = '', parent) {
      this.id = id; 
      this.path = path.dirname(id); //模块所在的文件目录
      this.exports = {};
      this.parent = parent;//父模块对象,构造成了一个深度的树状结构
      updateChildren(parent, this, false);
      this.filename = null; //当前模块的文件路径
      this.loaded = false; //模块是否已经加载完成
      this.children = []; //require加载的子模块
    }
    ```
    2.2 模块的load加载部分
  ```
    Module._load = function(request, parent, isMain) {
      // 步骤一：解析出模块的全路径
      const filename = Module._resolveFilename(request, parent, isMain);
      // 步骤二：加载模块，具体分三种情况处理
      // 情况一：存在缓存的模块，直接返回模块的 exports 属性,模块之间循环加载则会先返回module.export对象供其使用.
      const cachedModule = Module._cache[filename];
      if (cachedModule !== undefined) 
        return cachedModule.exports;
      // 情况二：加载内建模块
      const mod = loadNativeModule(filename, request);
      if (mod && mod.canBeRequiredByUsers) return mod.exports;
      // 情况三：构建模块加载
      const module = new Module(filename, parent);
      // 加载过之后就进行模块实例缓存
      Module._cache[filename] = module;

      // 步骤三：加载模块文件
      module.load(filename);

      // 步骤四：返回导出对象
      return module.exports;
    };

    //Module._resolveFilename = function(request, parent, isMain, options)查找模块所在的文件名
    //Module._resolveLookupPaths = function(request, parent)方法查找模块所有可能的路径
    //Module._findPath = function(request, paths, isMain)查找模块的具体文件路径
  ```
  2.3 模块的complie编译执行部分
  ```
    Module.prototype._compile = function(content, filename) {
      const dirname = path.dirname(filename);
      const require = makeRequireFunction(this, redirects); //创建module对象对应的require方法传递到子模块中进行加载,
      let result;
      const exports = this.exports;
      const thisValue = exports;
      const module = this;
      if (requireDepth === 0) statCache = new Map(); //入口模块建立map缓存子模块文件对应的输出
      if (inspectorWrapper) {
        result = inspectorWrapper(compiledWrapper, thisValue, exports,
                                  require, module, filename, dirname);
      } else {
        result = compiledWrapper.call(thisValue, exports, require, module,
                                      filename, dirname); //编译过程中子模块文件的require又会形成进一步的使用load方法递归加载子模块.
      }
      hasLoadedAnyUserCJSModule = true;
      if (requireDepth === 0) statCache = null; //主模块加载完成只有进行垃圾回收
      return result;
    };
  ```
  2.4 require方法创建.
    实际就是调用module.load方法去加载模块
  ```
    function makeRequireFunction(mod, redirects) {
      const Module = mod.constructor;

      let require;
      if (redirects) {
        
      } else {
        require = function require(path) {
          return mod.require(path);
        };
      }
      function resolve(request, options) {
        validateString(request, 'request');
        return Module._resolveFilename(request, mod, false, options);
      }

      require.resolve = resolve; //查找模块所在的文件路径

      function paths(request) {
        validateString(request, 'request');
        return Module._resolveLookupPaths(request, mod);
      }

      resolve.paths = paths; //查找所有模块可能存在的路径

      require.main = process.mainModule;

      // Enable support to add extra extension types.
      require.extensions = Module._extensions;

      require.cache = Module._cache; //所有模块加载的缓存结果

      return require;
    }
  ```


  2.2 文件定位
    查找出模块的具体存在名称.

  2.3 编译执行
    读取模块文件字符串,然后进行编译执行.将exports结果进行输出给父模块进行使用.

3. 原生模块和内置模块

​	原生模块和内置模块在Node源码编译过程中，编译进了二进制执行文件，在启动Node时，部分核心模块就被直接加载进了内存中，所以这部分模块引入时会直接跳过文件定位和编译执行，并且在路径分析中优先加载.非原生模块则需要完成整的路径分析、文件定位、编译执行。看完 require 的源码，终于豁然开朗，为什么我们能直接在代码中使用 `require` 、`export`、`module.exports` 以及`__filename` 和`__dirname` 这些变量了，他们并不是全局变量，而是在加载过程中注入的参数。



3. 循环依赖的问题



### module模块



1. 使用
2. 源码实现

### 调试技巧
[nodejs debug参考]<https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_restart-frame>
1 使用vscoe launch.json 设置之后进行调试.[参考]<>
```
{
  // 使用 IntelliSense 了解相关属性。 
  // 悬停以查看现有属性的描述。
  // 使用ctrl+ space 可以查看建议的填写内容
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387

  // 变量名称含义
  // 
  "version": "0.2.0",
  "configurations": [
     //配置多个启动调式的方式
    {
      "type": "node", //调试器类型
      "request": "launch", //launch表示启动 attch表示附加
      "name": "index", //启动配置名称
      "presentation":{ //将不同的调试启动文件进行分组方便查找
        "hidden": false, 
        "group": "sunj", //所在组名,组名并不会显示
        "order": 4 //声明组内的排序
      },
      // "preLaunchTask":{
      //   "task": "",
      //   "type": ""
      // }, //开始调试之前运行的任务
      // "postDebugTask": {
      //   "task": "",
      //   "type": ""
      // },//调试完成之后运行的任务
      "skipFiles": [
        "<node_internals>/**" ,//跳过所有Node.js的内置模块
        "${workspaceFolder}/test.js"
      ],
      // "runtimeExecutable": "npm",//任务运行工具,使用'npm','mocha','glup'等方式启动程序的调试.
      // "runtimeArgs": ["run","start"],//传递给执行工具的可选参数
      "port":9939,//启动程序的端口
      "program": "${workspaceFolder}/index.js", //启动调试器要运行的可执行文件
      "args": ["ls","--scope=123"], //传递给程序进行的调试参数
      "env": {},//环境变量
      "cwd": "${workspaceFolder}",//当前的工作目录,用于查找依赖关系和其它文件
      "console": "internalConsole", //控制台使用内置或者系统终端输出信息
      "stopOnEntry": true ,//程序运行时第一行即进入调试状态
      "serverReadyAction": { //当调式服务的时候当控制台输出的内容与pattern匹配则会自动打开匹配的端口号
        "pattern": "listening on port ([0-9]+)",
        "uriFormat": "http://localhost:%s",
        "action": "openExternally"
      },
      "setupCommands": [ //TODO
        {
            "description": "Enable pretty-printing for gdb",
            "text": "-enable-pretty-printing",
            "ignoreFailures": true
        }
    ]
    } ,
    {
      "type": "node", //调试器类型
      "request": "launch", //launch表示启动 attch表示附加
      "name": "test", //启动配置名称
      "presentation":{
        "hidden": false,
        "group": "sunj",
        "order": 2
      },
      "skipFiles": [
        "<node_internals>/**" ,//跳过所有Node.js的内置模块
      ],
      "program": "${workspaceFolder}/test.js", //启动调试器要运行的可执行文件
      "args": ["ls","--scope=123"], //传递给程序进行的调试参数
      "console": "internalConsole", //控制台使用内置或者系统终端输出信息
    } ,
  ],
  // "compounds": [
  //   {
  //     "name": "index/test",
  //     "configurations": ["index", "test"],
  //     "preLaunchTask": "${defaultBuildTask}",
  //     "stopAll": true
  //   }
  // ],
}
```
2 使用chrome 配合 node --inspect(--inspect-brk) index.js 进行调试.

[参考](https://www.bbsmax.com/A/ZOJPy12P5v/>)

 * npm install -g node-inspect
 * 通过谷歌浏览器打开：chrome://flags/#enable-devtools-experiments.设置调试工具Debugging tools for UI为true
 * 在cmd中输入：node --inspect 文件名 ,或者 node --inspect-brk 文件名.--inspect-brk在文件第一行就会终端进入调试状态.
 * chrome打开控制台输出的远程地址( ws://127.0.0.1:9229/e53d883b-7ebd-4a3f-9458-a334ffc8fdf9)
 * 点击右上角node图标开启调试.

3 vscode设置
 vscod node debug 设置 Auto Attach Filter 
 * always 所有的都会开启调试
 * smart  非node_modules 自动开启调试
 * onlyWithFlag  只有node --inspect or --inspect-brk 才会进入调试





### child process

1. 基本使用

​	exec,execFile,spawn,fork,execSync,execFileSync,spawnSync.底层都是已spawn为主

2. 源码分析

​	





### 版本号比较

x.y.z.主版本号,此版本号,修订版本

1.0.0-alpha < 1.0.0-alpha.1 < 1.0.0-alpha.beta < 1.0.0-beta < 1.0.0-beta.2 < 1.0.0-beta.11 < 1.0.0-rc.1 < 1.0.0。

- alpha: 内部版本
- beta: 公测版本
- rc: 即Release candiate，正式版本的候选版本
- 兼容模块新发布的补丁版本：~16.2.0、16.2.x、16.2
- 兼容模块新发布的小版本、补丁版本：^16.2.0、16.x、16
- 兼容模块新发布的大版本、小版本、补丁版本：*、x

### 常用库

nodemon
  监视源文件中任何的更改并自动重启服务器。Nodemon不会对你的代码产生额外的更改.只是node命令的替代品.
import-local

​	全局的脚手架通过查找本地是否存在相同的脚手架存在则使用本地的脚手架版本.

local-path

find-up

path-exists

fs-extra

Resolve-cwd

pkg-dir
resolve-from
yargs
commander
inquirer
