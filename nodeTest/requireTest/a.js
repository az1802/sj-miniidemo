console.log("a模块开始运行");
exports.a_add = a_add;


function a_add(){

}

exports.a = 'a';
let b = require('./b');
exports.a1 = 'a1';
console.log("输出模块b的内容",b)
console.log("a模块结束运行");