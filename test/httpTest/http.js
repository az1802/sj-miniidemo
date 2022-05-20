const http = require('http');

let server1 = http.createServer((req,res)=>{

  res.end('123')
})

server1.listen(3001,()=>{
  console.log('端口 3001 启动成功')
})
