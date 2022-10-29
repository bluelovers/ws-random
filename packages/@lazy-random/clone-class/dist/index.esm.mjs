function getClass(s, t, ...e) {
  let n;
  return n = t instanceof s ? t.__proto__.constructor : s, n;
}

function cloneClass(s, t, ...e) {
  return new (getClass(s, t, ...e))(...e);
}

export { cloneClass, cloneClass as default, getClass };
//# sourceMappingURL=index.esm.mjs.map
