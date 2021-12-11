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

export { cloneClass, cloneClass as default, getClass };
//# sourceMappingURL=index.esm.mjs.map
