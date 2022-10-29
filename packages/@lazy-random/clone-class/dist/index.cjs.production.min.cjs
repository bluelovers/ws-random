"use strict";

function getClass(e, s, ...t) {
  let o;
  return o = s instanceof e ? s.__proto__.constructor : e, o;
}

function cloneClass(e, s, ...t) {
  return new (getClass(e, s, ...t))(...t);
}

Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.cloneClass = cloneClass, exports.default = cloneClass, exports.getClass = getClass;
//# sourceMappingURL=index.cjs.production.min.cjs.map
