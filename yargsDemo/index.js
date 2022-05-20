#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
yargs(hideBin(process.argv))
  .command('init [namae]','set name',yargs=>{
    return yargs.positional('name',{
      describe:'name of project',
      default:"sunj"
    })
  },argv=>{
    console.log(argv)
  }).command({
    command:"add [name]",
    describe:"add module",
    aliases:['ad'],
    builder(yargs){
      console.log('build 指令')
    },
    handler(argv){
      console.log("指令参数--",argv)
    },
    // middlewares:[
    //   ()=>{
    //     console.log('中间件')
    //   }
    // ],
  })
  .parse()

  


/**
 * 链式调用函数
 *   hideBin  解析参数
  command声明指令
  options options提示信息
  parse最后输出最终结果
 */
