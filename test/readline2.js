const readline = require('readline');
const fs = require('fs');
const path = require('path');
let r1 = readline.createInterface({
  input:fs.createReadStream(path.resolve(__dirname,"./access.log")),
  output:fs.createWriteStream(path.resolve(__dirname,"./access1.log")),
});

r1.setPrompt("Hi>");
r1.prompt();

r1.on('line',data=>{
  switch(data){
    case 'a':
      console.log("a");
      break;
    case 'b':
      console.log("b");
      break;
    case 'c':
      console.log("c");
      break;
    case 'copy':
    console.log('args: ', args);
      console.log("复制");
      break;
    case 'close':
      r1.close();
      break;
    default :
      console.log("没有找到命令!");
  }
  r1.prompt();
})


r1.on('close',(...args)=>{
  console.log('args: ', args);
})
