async function f1() {
  console.log('f1函数执行');
  throw new Error('出错了1');
  return 123;
}
async function f2() {
  console.log('f2函数执行');
  throw new Error('出错了2');
  return 123;
}

async function gen(){
  try{
    let res1 = await f1().catch(err=>{console.log(err.name)});
    let res2 = await f2().catch(err=>{console.log(err.name)});
  }catch(err){
    console.log("捕获错误",err);
  }
}

gen()