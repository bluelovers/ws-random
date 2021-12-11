"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shared_lib_1 = require("@lazy-random/shared-lib");
const df_uniform_1 = require("@lazy-random/df-uniform");
const bytes_to_uuid_1 = require("@lazy-random/bytes-to-uuid");
/**
 * @see https://github.com/tracker1/node-uuid4/blob/master/index.js
 */
function default_1(random, toUpperCase) {
    let fn = (0, df_uniform_1.uniformBytes)(random, 16);
    let fn2 = (0, bytes_to_uuid_1._createBytesToUuidFn)(toUpperCase ? shared_lib_1.BYTE_TO_HEX_TO_UPPER_CASE : shared_lib_1.BYTE_TO_HEX_TO_LOWER_CASE);
    return () => {
        let arr = fn();
        arr[6] = (arr[6] & 0x0f) | 0x40;
        arr[8] = (arr[8] & 0x3f) | 0x80;
        let id = fn2(arr);
        return id;
    };
}
exports.default = default_1;
//# sourceMappingURL=uuidv4.js.map