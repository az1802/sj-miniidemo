const readline = require('readline');
const fs = require('fs')

let fileStream = fs.createWriteStream('output.txt');
let r1 = readline.createInterface({
  input: process.stdin,
  output: fileStream,
  prompt: 'OHAI> '
});

// r1.question("你叫什么名字\t", function (answer) {
//   console.log("我的名字是：", answer);
//   // 不加close，则不会结束
//   r1.close();
// })
// r1.setPrompt("Test> ");
r1.prompt();

r1.on("line", function (line) {
  switch (line.trim()) {
      case "a":
          r1.write("aaa ");
          readline.clearScreenDown()
          break;
      case "copy":
          console.log("复制");
          console.log('光标的位置',r1.getCursorPos())
          break;
      case "hello":
          r1.write("Hello ");
          console.log("World!");
          break;
      case "close":
          r1.close();
          break;
      default:
          console.log("没有找到命令！");
          break;
  }
  r1.prompt();
})
r1.on('history', (history) => {
  console.log(`Received: ${history}`);
});
r1.on('pause', () => {
  console.log('Readline paused.');
})
r1.pause()

setTimeout(()=>{
  console.log('命令行恢复')
  r1.resume()

},0)

r1.on('SIGINT',()=>{
  console.log('SIGINT: ');
  process.exit(0);
})
r1.on('SIGTSTP',()=>{
  console.log('SIGTSTP: ');
  process.exit(0);
})

//close事件监听
r1.on("close", function () {
  console.log('close: ');
  // 结束程序
  process.exit(0);
})