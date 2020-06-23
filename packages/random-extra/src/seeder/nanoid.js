"use strict";
/**
 * Created by user on 2018/10/21/021.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.nanoid = void 0;
const non_secure_1 = require("nanoid/non-secure");
function nanoid(input, ...argv) {
    return non_secure_1.nanoid();
}
exports.nanoid = nanoid;
exports.default = nanoid;
//# sourceMappingURL=nanoid.js.map