const pkgDir = require('pkg-dir');

let pkgPath = pkgDir.sync(__dirname)
console.log(pkgPath)