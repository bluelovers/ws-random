'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * 嘗試保存原始的 Math.random，
 * 若尚無其他模組覆寫 Math.random
 *
 * 必須在任何覆寫 Math.random 的套件載入之前先載入本模組，快照 (Snapshot) 才會是真正的原生版本
 * try save original Math.random,
 * if no other module overwrite Math.random
 *
 * Must be loaded before any package that overwrites Math.random, otherwise the snapshot will not be the native one
 *
 * @alias Math.random
 */
const _MathRandom = Math.random;

exports._MathRandom = _MathRandom;
exports.default = _MathRandom;
//# sourceMappingURL=index.cjs.development.cjs.map
