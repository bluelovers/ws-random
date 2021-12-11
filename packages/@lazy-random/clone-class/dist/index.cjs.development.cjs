'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function getClass(RNGClass, thisArgv, ...argv) {
  let o;

  if (thisArgv instanceof RNGClass) {
    o = thisArgv.__proto__.constructor;
  } else {
    o = RNGClass;
  }

  return o;
}
function cloneClass(RNGClass, thisArgv, ...argv) {
  let o = getClass(RNGClass, thisArgv, ...argv);
  return new o(...argv);
}

exports.cloneClass = cloneClass;
exports["default"] = cloneClass;
exports.getClass = getClass;
//# sourceMappingURL=index.cjs.development.cjs.map
