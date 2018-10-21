/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
exports._MathRandom = _MathRandom = Math.random;
/**
 * @todo support typescript
 */
function getClass(RNGClass, thisArgv, ...argv) {
    let o;
    if (thisArgv instanceof RNGClass) {
        // @ts-ignore
        o = (thisArgv.__proto__.constructor);
    }
    else {
        o = RNGClass;
    }
    return o;
}
exports.getClass = getClass;
/**
 * @todo support typescript
 */
function cloneClass(RNGClass, thisArgv, ...argv) {
    let o = getClass(RNGClass, thisArgv, ...argv);
    return new o(...argv);
}
exports.cloneClass = cloneClass;
// @ts-ignore
Object.freeze(exports);
