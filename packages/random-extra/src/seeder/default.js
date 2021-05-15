"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedToken = void 0;
/**
 * Created by user on 2018/10/20/020.
 */
const check_1 = require("chai-asserttype-extra/lib/check");
function seedToken(seed, opts, ...argv) {
    // TODO: add entropy and stuff
    if (check_1.isIntFinite(seed)) {
        return seed;
    }
    else {
        let strSeed = '' + seed;
        let s = 0;
        let len = strSeed.length;
        for (let k = 0; k < len; ++k) {
            s ^= strSeed.charCodeAt(k) | 0;
        }
        return s;
    }
}
exports.seedToken = seedToken;
exports.default = seedToken;
//# sourceMappingURL=default.js.map