let R = require('ramda');

let obj ={a: {b: {c: 0}}}
obj.__proto__ = {d:'d'}

const people = [
    { name: 'Emma', age: 70 },
    { name: 'Peter', age: 78 },
    { name: 'Mikhail', age: 62 },
  ];

R.compose(console.log,R.toPairsIn)(obj)


const raceResultsByFirstName = {
    first: 'alice',
    second: 'jake',
    third: 'alice',
  };
console.log(  R.objOf("ss","bb"))