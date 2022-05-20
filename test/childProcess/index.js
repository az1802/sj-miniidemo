let cp = require('child_process');
const path = require('path')
console.log('主线程启动')


let child = cp.spawn('ls',['-l']);

// let child = cp.fork(path.resolve(__dirname,'child.js'))

// console.log('child: ', child);



child.stdin.on('close',(...args)=>{
  console.log('stdin close: ', args);
})

child.stdout.on('close',(...args)=>{
  console.log('stdout close: ', args);
})

child.stderr.on('close',(...args)=>{
  console.log('stderr close: ', args);
})


child.stdin.on('data',(...args)=>{
  console.log('stdin data: ', args);
})

child.stdout.on('data',(...args)=>{
  console.log('stdout data: ', args[0].toString());
})

child.stderr.on('data',(...args)=>{
  console.log('stderr data: ', args);
})








// let res = cp.execSync('ls -l');
// let res = cp.execFileSync("ls",['-l'],{
//   cwd:path.resolve(__dirname,"../"),
// });
// let res = cp.execFileSync(path.resolve(__dirname,'./test.shell'),['-aa']);
// let res = cp.spawnSync("ls",['-l']);


// let child = cp.fork(path.resolve(__dirname,"./child.js"));

// child.on('message',msg=>{
//   console.log('来自子线程的消息',msg)
// })

// child.send('父进程发送消息')






// console.log('res: ', res.toString());