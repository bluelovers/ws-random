"use strict";
/**
 * 根目錄入口：把共用的 random 實例以 `export =` 形式匯出，
 * 讓 CommonJS 的 `require('random-extra')` 直接取得該實例。
 *
 * Root entry: exposes the shared random instance via `export =` so CommonJS
 * `require('random-extra')` receives the instance directly.
 */
const random_1 = require("./src/random");
module.exports = random_1.random;
//# sourceMappingURL=index.js.map