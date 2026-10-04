"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * 套件入口 (Entry Point)：重新匯出 random 模組的所有具名成員，
 * 並把同一個共用實例設定為預設匯出 (Default Export)。
 *
 * Package entry point: re-exports every named member of the random module and
 * exposes the same shared instance as the default export.
 */
tslib_1.__exportStar(require("./random"), exports);
const random_1 = require("./random");
exports.default = random_1.random;
//# sourceMappingURL=index.js.map