/**
 * Created by user on 2018/11/17/017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BYTE_TO_HEX_TO_LOWER_CASE = [];
exports.BYTE_TO_HEX_TO_UPPER_CASE = [];
for (let i = 0; i < 256; ++i) {
    // @ts-ignore
    exports.BYTE_TO_HEX_TO_LOWER_CASE[i] = (i + 0x100).toString(16).substr(1);
    // @ts-ignore
    exports.BYTE_TO_HEX_TO_UPPER_CASE[i] = exports.BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase();
}
// @ts-ignore
exports.BYTE_TO_HEX_TO_LOWER_CASE = Object.freeze(exports.BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
exports.BYTE_TO_HEX_TO_UPPER_CASE = Object.freeze(exports.BYTE_TO_HEX_TO_UPPER_CASE);
function _bytesToUuid(bth = exports.BYTE_TO_HEX_TO_LOWER_CASE) {
    return (buf, offset) => {
        let i = offset || 0;
        // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
        return ([
            bth[buf[i++]], bth[buf[i++]],
            bth[buf[i++]], bth[buf[i++]], '-',
            bth[buf[i++]], bth[buf[i++]], '-',
            bth[buf[i++]], bth[buf[i++]], '-',
            bth[buf[i++]], bth[buf[i++]], '-',
            bth[buf[i++]], bth[buf[i++]],
            bth[buf[i++]], bth[buf[i++]],
            bth[buf[i++]], bth[buf[i++]],
        ]).join('');
    };
}
exports._bytesToUuid = _bytesToUuid;
/**
 * @see https://github.com/kelektiv/node-uuid/blob/master/lib/bytesToUuid.js
 */
function bytesToUuid(buf, offset, bth = exports.BYTE_TO_HEX_TO_LOWER_CASE) {
    let i = offset || 0;
    // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
    return ([
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]], '-',
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
        bth[buf[i++]], bth[buf[i++]],
    ]).join('');
}
exports.bytesToUuid = bytesToUuid;
function stringifyByte(byte) {
    return exports.BYTE_TO_HEX_TO_UPPER_CASE[byte];
}
exports.stringifyByte = stringifyByte;
function toHexArray(arr) {
    return arr.map(stringifyByte);
}
exports.toHexArray = toHexArray;
// @ts-ignore
Object.freeze(exports);
