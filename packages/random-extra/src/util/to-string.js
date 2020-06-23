"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatToString = void 0;
function floatToString(n) {
    let int = Math.floor(n);
    let float = n - int;
    let s = String(float)
        .split('.')[1];
    return String(int) + (s ? '.' + s : '');
}
exports.floatToString = floatToString;
//# sourceMappingURL=to-string.js.map