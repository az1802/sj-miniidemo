# lerna使用





### 简介

* [官网](https://www.lernajs.cn/)
* [github地址](https://github.com/lerna/lerna#readme)
* [参考资料](https://blog.csdn.net/qdmoment/article/details/95629850)

Lerna是一种工具,针对使用git和npm管理多软件包代码仓库的工作流程进行优化.Lerna中的两个主要命令是 lerna bootstrap 和 lerna publish。 bootstrap 将把 repo 中的依赖关系链接在一起。 publish 将有助于发布软件包更新。lerna不能作为各个包服务的部署.

### lerna解决的问题



<img src="/Users/m1pro/Desktop/mine/sj-miniidemo/lernaDemo/lerna使用.assets/image-20220506010831591.png" alt="image-20220506010831591" style="zoom:25%;" />

2. 一个给予git+npm的多package项目的管理工具

   大幅减少重复操作,提升操作的标准化

### lerna指令

1. lerna init
   初始化,创建lerna.json文件.全局进行配置
2. lerna create <name> -loc
   创建包,可以指定路径
3. lerna add
  * 不指定包名时所有的包安装依赖
  * 指定包名时给指定的包安装依赖,--scope=packageName,指定依赖安装的默认路径.
  * 安装时会去package.json查询如果存在这个包则不会进行安装(注意node_modules被手动删除时,安装失败的情况)
  * 默认是dependencies,--dev(devDependencies),--per(peerDependencies)
3. lerna bootstrap
  * 重新安装依赖
  * 软链接相互依赖的库到具体的目录(lerna link)
  * 执行 npm run prepublish
  * 执行 npm run prepare
    options
  * --hoist 将所有的依赖安装到根目录
  * --ignore 忽略指定的包
  * --scope 安装到指定的包

4. lerna clean
   删除所有包下面的node_modules
5. lerna link
   将所有的包相互进行依赖,然后可以直接通过lerna add module1 --scope=module2进行软连接安装
6. lerna exec
   * 为每一个子包执行命令(lerna exec -- rm -rf node_modules/)
   * --scope name   指子包
7. lerna run
   * 执行包中packages.json中的scripts指令
   * --scope name 指定子包
8. lerna changes
   * 查看修改的子包
9. lerna help
10. lerna diff
    * 查看子包的修改内容
11. lerna version

### lerna.json

1. packages
   所有包的管理

3. add
   * 不指定包名时所有的包安装依赖
   * 指定报名时给指定的包安装依赖,--scope=packageName,指定依赖安装的默认路径.
   * 默认是dependencies,--dev(devDependencies),--per(peerDependencies).



### leran源码分析



### lerna发布流程






### 待整理
* independent 独立模式,主要针对版本号的处理
* linux 硬链接与软连接 https://zhuanlan.zhihu.com/p/438527922 
* 如何处理不同子包对同一个包不同版本的依赖问题
* lerna 与yanr workspace的使用区别   yarn workspace 进行对node_modules的管理和安 并处理对应子包的package.json .lerna 从全局对各个子包进行管理 
* lerna  可以创建子包  

  yarn 与lenra 都可以给子包或者所有子包 同时安装依赖 但是lenra不能处理子包共享所有包的问题

lerna 包的发布



  
