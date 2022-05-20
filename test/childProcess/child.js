console.log('子线程启动')



setTimeout(()=>{
  process.send('子线程延迟1s发送消息')
},1000)



process.on('message',msg=>{
  console.log('接受父进程的消息',msg)
})




console.log("子线程",process.pid);