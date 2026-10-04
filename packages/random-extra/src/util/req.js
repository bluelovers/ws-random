"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryRequire = tryRequire;
function tryRequire(name) {
    /**
     * 呼叫端通常以字面值傳入 name，因此直接回傳 require 結果即可；
     * 若模組不存在會直接拋出，交由上層決定是否需要 try/catch。
     *
     * Callers normally pass a literal name, so the require result is returned as
     * is; a missing module throws and leaves error handling to the caller.
     */
    return require(name);
}
//# sourceMappingURL=req.js.map