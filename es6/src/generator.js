function* inner() {
  try {
    yield 1;
    yield 2;
    yield 3;
  } catch (e) {
    console.log('内部捕获');
  }
  return 100;
}
function* outter(){
  yield 4;
  let val = yield* "hello";
  console.log('val: ', val);
  yield 5;
}

var g = new outter();
