'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @todo support typescript
 */
function getClass(RNGClass, thisArgv, ...argv) {
  let o;
  if (thisArgv instanceof RNGClass) {
    // @ts-ignore
    o = thisArgv.__proto__.constructor;
  } else {
    o = RNGClass;
  }
  return o;
}
/**
 * @todo support typescript
 */
function cloneClass(RNGClass, thisArgv, ...argv) {
  let o = getClass(RNGClass, thisArgv, ...argv);
  // @ts-ignore
  return new o(...argv);
}

exports.cloneClass = cloneClass;
exports.default = cloneClass;
exports.getClass = getClass;
//# sourceMappingURL=index.cjs.development.cjs.map
