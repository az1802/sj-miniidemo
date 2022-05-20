const npmInstall = require('npminstall');
const axios = require('axios')
const path= require('path');

async function install(){
  let ret1 = await npmInstall({
    root:__dirname,
    storeDir:path.resolve(__dirname,'cache'),
    targetDir:path.resolve(__dirname,'target'),
    pkgs:[{
      name:"axios"
    }],
    debug:true
  })

  console.log('ret1',ret1)
}


install()