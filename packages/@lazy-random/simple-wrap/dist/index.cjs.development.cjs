'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Created by user on 2018/10/22/022.
 */
const defaultArgv = /*#__PURE__*/Object.freeze({
  int: /*#__PURE__*/Object.freeze([0, 100]),
  integer: /*#__PURE__*/Object.freeze([0, 100]),
  boolean: /*#__PURE__*/Object.freeze([0.5]),
  bytes: /*#__PURE__*/Object.freeze([1])
});
function simpleWrap(fn) {
  let self = {
    next() {
      return fn();
    },
    random() {
      return fn();
    },
    float(min = 0, max = 1) {
      return fn() * (max - min + 1) + min;
    },
    int(min = 0, max = 100) {
      return Math.floor(fn() * (max - min + 1) + min);
    },
    get integer() {
      return self.int;
    },
    boolean(likelihood = 0.5) {
      return fn() >= likelihood;
    },
    byte() {
      return self.int(0, 255);
    },
    bytes(size = 1) {
      let arr = [];
      for (let i = 0; i < size; i++) {
        arr.push(self.byte());
      }
      return arr;
    },
    seed(...argv) {
      return self;
    }
  };
  return self;
}

exports.default = simpleWrap;
exports.defaultArgv = defaultArgv;
exports.simpleWrap = simpleWrap;
//# sourceMappingURL=index.cjs.development.cjs.map
