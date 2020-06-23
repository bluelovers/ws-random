"use strict";
/**
 * Created by user on 2018/10/20/020.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedToken = void 0;
function seedToken(seed, opts, ...argv) {
    // TODO: add entropy and stuff
    if (seed === (seed | 0)) {
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