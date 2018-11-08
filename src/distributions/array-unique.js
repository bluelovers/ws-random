Object.defineProperty(exports, "__esModule", { value: true });
const ow_lite_1 = require("ow-lite");
const distributions_1 = require("../util/distributions");
exports.default = (random, arr, limit, loop, fnRandIndex, fnOutOfLimit) => {
    const randIndex = (len) => {
        return distributions_1.randIndex(random, len);
    };
    let clone = arr.slice();
    limit = Math.min(limit || clone.length, clone.length);
    fnRandIndex = fnRandIndex || randIndex;
    loop = !!loop;
    ow_lite_1.default(limit, ow_lite_1.default.number.integer.gt(0));
    ow_lite_1.default(fnRandIndex, ow_lite_1.default.function);
    let count = limit;
    let len;
    function _fnClone(arr) {
        clone = arr.slice();
        count = limit;
        len = clone.length;
    }
    return () => {
        len = clone.length;
        if (len === 0 || count-- === 0) {
            let _loop = loop;
            if (fnOutOfLimit) {
                let ret = fnOutOfLimit(arr, limit, loop, fnRandIndex);
                if (Array.isArray(ret) && ret.length > 0) {
                    _fnClone(ret);
                    _loop = null;
                }
                else if (ret == true) {
                    _loop = true;
                }
                else if (typeof ret !== 'undefined') {
                    _loop = false;
                }
            }
            if (_loop) {
                _fnClone(arr);
            }
            else if (_loop !== null) {
                throw new RangeError(`can't call arrayUnique > ${limit} times`);
            }
        }
        let i = fnRandIndex(len);
        return clone
            .splice(i, 1)[0];
    };
};
// @ts-ignore
Object.freeze(exports);
