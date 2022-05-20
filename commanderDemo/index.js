#! /usr/bin/env node
/**
 * 命令行 options的设计和处理
 * --表示option结束后续不会处理
 */

const {Command,Option,Argument} = require('commander');

const program = new Command();



program
  .version('0.0.1')
  .option('-c, --config <path>', 'set config path', './deploy.conf');
program
  .command('setup [env]')
  .description('run setup commands for all envs')
  .option('-s, --setup_mode <mode>', 'Which setup mode to use', 'normal')
  .action((env, options) => {
    console.log('env, options: ', env, options);
  });


program.parse(process.argv)
console.log("命令options解析",program.opts())