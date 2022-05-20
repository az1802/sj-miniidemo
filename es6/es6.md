# es6特性

* [参考]<https://es6.ruanyifeng.com/#docs>
* 利用babel对es6及以上语法进行转换


### generator函数


1 基本介绍
Generator函数是ES6提供的一种异步编程解决方案,语法行为与传统函数完全不同.

2基本使用
2.1 generator函数特征
* function关键字与函数名之间有一个星号
* 函数体内部使用yield表达式,定义不同的内部状态（yield在英语里的意思就是“产出”）。
2.2 运行
* 只有调用函数返回值的next方法才能使得函数运行;
* next方法可以恢复函数的内部运行,第一次运行到第一个yield的地方,后续从上一个yeild的地方运行到下一个yeild的地方.遇到return或者直到函数运行完.状态更改为done.后续运行返回同一结果状态
* 通过next传值达到一个内外通信的效果.Generator函数从暂停状态到恢复运行,它的上下文状态(context)是不变的.通过next方法的参数,就有办法在 Generator 函数开始运行之后,继续向函数体内部注入值.也就是说,可以在 Generator 函数运行的不同阶段,从外部向内部注入不同的值,从而调整函数行为。
* throw方法用于抛出错误,如果generator函数内部有错误捕获则内部处理,否则冒牌至外层函数,外层函数未能捕获则冒泡至全局.
* return 方法用于提前设置generator函数状态为完成状态,后续执行next剩余代码将不会执行
* 如果 Generator 函数内部有try...finally代码块,且正在执行try代码块,那么return()方法会导致立刻进入finally代码块,执行完以后,整个函数才会结束.
* next()是将yield表达式替换成一个值.throw()是将yield表达式替换成一个throw语句.return()是将yield表达式替换成一个return语句;
2.3 yeild*
如果在 Generator 函数内部，调用另一个 Generator 函数。需要在前者的函数体内部，自己手动完成遍历。
* yield* 后面的 Generator 函数（没有return语句时）,不过是for...of的一种简写形式，完全可以用后者替代前者。反之，在有return语句时，则需要用var value = yield* iterator的形式获取return语句的值。
* 实际上，任何数据结构只要有 Iterator 接口，就可以被yield*遍历。

2.3 注意事项
* yeild后面的表达式只有当运行到此处时才会执行
* yield表达式如果用在另一个表达式之中，必须放在圆括号里面。
* Generator函数g返回的遍历器obj,是g的实例,而且继承了g.prototype.但是如果把g当作普通的构造函数,并不会生效.因为g返回的总是遍历器对象,而不是this对象.

3 与Iterator关系
* for of可以作为generator函数的自动执行器.
* 除了for...of循环以外，扩展运算符（...）、解构赋值和Array.from方法内部调用的，都是遍历器接口。
```
function * objectEntries(){
  let keys = Object.keys(this);
  for(key of keys){
    yield [key,this[key]];
  }
}

let obj = {
  a:"aa",
  b:"bb"
}

// generator函数与iterator的应用
obj[Symbol.iterator] = objectEntries
for(let [key,val] of obj){
  console.log('key,val: ', key,val);
}
let [one] = obj; //one:['a','aa']
```

5 babel转换
利用while以及函数内部的状态标记,让每次函数运行时进入到特定的代码部分,同时更改内部标记状态值使得下次进入到下一个代码片段.
```
function helloWorld() {
  return regeneratorRuntime.wrap(function helloWorld$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 'hello';

        case 2:
          _context.next = 4;
          return "world";

        case 4:
          return _context.abrupt("return", 'ending');

        case 5:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
```

6 使用场景
6.1 异步操作
  协程遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。它的最大优点，就是代码的写法非常像同步操作，如果去除yield命令，简直一模一样
  使用Thunk函数进行封装时候可以将next的执行时机放入到thunk函数的回调之中.这样规律的行为可以实现generator异步场景的自动执行.
  co模块与thunk函数的区别就是使用promise对象将next的执行时机放入的then方法之中.同样可以实现generator异步场景的自动执行
  使用
* 控制流管理
* 部署iterator接口
* 作为数据结构


7 复杂generator函数的应用
forEach,some,map,reduce等数组运行时使用generator函数,整体状态的控制.

8 调试

### async函数
1 错误的捕获处理
2

1 generator函数的语法糖,异步操作同步化.
2 await 后面可以接promise对象,原始值类型