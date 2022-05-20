"use strict";

require("regenerator-runtime/runtime.js");

var _marked = /*#__PURE__*/regeneratorRuntime.mark(foo);

function foo(x) {
  var y, z;
  return regeneratorRuntime.wrap(function foo$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return x + 1;

        case 2:
          _context.t0 = _context.sent;
          y = 2 * _context.t0;
          _context.next = 6;
          return y / 3;

        case 6:
          z = _context.sent;
          return _context.abrupt("return", x + y + z);

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var a = foo(5);
console.log(a.next());
console.log(a.next());
console.log(a.next());
var b = foo(5);
console.log(b.next());
console.log(b.next(12));
console.log(b.next(13));