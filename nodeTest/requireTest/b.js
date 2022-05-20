console.log("b模块开始运行");
exports.b = 'b';
let a = require('./a');
exports.b1 = 'b1';
console.log("输出模块a的内容",a)
console.log("b模块结束运行");
setTimeout(()=>{
  console.log('延迟输出a模块',a)
})