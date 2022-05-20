# Commander


###全局设置
* option
* command列表
* 全局的help信息
  

### 命令的设置
* 命令的帮助信息
* 命令的option,option的参数
* 命令的参数
* 命令的嵌套
* 内部指令

### options的设计
* options的名称,描述,是否必填,默认值
* -abp80 options的简写可以合并
* -- 后续的options不会被处理
* no-和非no-开头option的设计,当只定义了带no-的选项，未定义对应不带no-的选项时，该选项的默认值会被置为true。
* 可变参数的设计
  .option('-l, --letter [letters...]'
  让--成为语法的一部分,选项放在最后,使用选项代理命令行参数
* 根据option自动生成help