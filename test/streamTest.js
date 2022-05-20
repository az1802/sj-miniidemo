const {Readable ,Writable} = require('stream');


class CusotomWritable extends Writable{
  constructor(...args){
    super(...args)
  }
}

// let w1 = new CusotomWritable({
//   write(chunk,encoding,cb){
//     console.log('chunk,encoding: ', chunk.,encoding);
//     cb()
//   }
// })

let r1 = new Readable({
  read(...args){
    console.log('...args: ', ...args);
  }
});
r1.push('abcdefg');
r1.push(null)


r1.pipe(process.stdout)


// process.stdin.pipe(w1)