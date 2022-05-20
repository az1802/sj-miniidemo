#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

yargs(hideBin(process.argv))
  .command('init [name]', 'Do init a project', (yargs) => {
    return yargs
      .positional('name', {
        type:"string",
        describe: 'Name of a project',
        default: "test"
      })
  }, (argv) => {
   console.info(`project name:${argv.name}`)
  })
  .parse()