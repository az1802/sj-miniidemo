/**
 * 文件的基本操作
 * 创建(fs.ensureFile,fs.createFile,fs.ensureDir,fs.mkdir),
 * 删除(fs.emptyDir,fs.remove,fs.rmdir)
 * 写fs.outputFile,fs.outputJson(可以写入对象),fs.writeFile,fs.appendFile(文件后继续写入),
 * 读(fs.readFile,fs.readdir-读取文件夹),
 * 复制(fs.copy)
 * 移动(fs.move),
 * 权限更改fs.chmod,
 * 更改名称fs.rename,fs.
 * 文件是否存在 fs.pathExists
 * 
 * 文件的描述符
 * r,r+,w,w+,a,a+
 * 文件的状态
 * fs.stat
 * 
 */
const fs = require('fs-extra')

async function testFs(){
  // let res = await fs.copy('../indexa.js','./fs.js').catch(err=>{ //复制文件 index.js 到fs.js中
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.emptyDir('../fsTestaaa').catch(err=>{ // 文件目录不存在则创建,存在则清空文件夹内容
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.ensureFile('./fsExtra.js').catch(err=>{ // 文件不存在就会创建,确保文件存在
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.ensureDir('./fsExtra.j').catch(err=>{ // 文件夹不存在就会创建,确保文件夹存在
  //   console.log(err);
  //   return 'fail'
  // });
 
  // let res = await fs.outputFile('./b.js',{a:"aaa"}).catch(err=>{ // 文件不存在就会存在然后写入内容
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.outputJson('./bb.js',{a:"aaaaa"}).catch(err=>{ // 文件不存在就会创建,对写入json文件
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.ensureLink('./bb.js','./bbb.js').catch(err=>{ // 确保硬链接./bbb.js存在
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.remove('./a.js').catch(err=>{ // 移除文件a.js
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.writeFile('./a.js','new a').catch(err=>{ // 在a.js文件后面写入字符串
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.appendFile('./a.js','new a').catch(err=>{ // 在a.js文件后面写入字符串
  //   console.log(err);
  //   return 'fail'
  // });
  // let res = await fs.pathExists('./aa.js').catch(err=>{
  //   console.log(err);
  //   return false;
  // })
  // let res = await fs.rename('./aa.js','./a.js').catch(err=>{
  //   console.log(err);
  //   return false;
  // })
  // let res = await fs.readdir('../fsTest').catch(err=>{
  //   console.log(err);
  //   return false;
  // })
  // let res = await fs.createFile('./aa.js').catch(err=>{
  //   console.log(err);
  //   return false;
  // })
  // let res = await fs.rmdir('./a').catch(err=>{
  //   console.log(err);
  //   return false;
  // })
  let res = fs.watchFile('./a.js',(prev,cur)=>{
    console.log('prev,cu: ', prev,cur);
  })


  // let res = await fs.stat('./a.js').catch(err=>{ //获取文件的状态
  //   console.log(err);
  //   return false;
  // })
  
  console.log(res);
}


testFs()