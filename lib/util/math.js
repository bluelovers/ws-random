Object.defineProperty(exports, "__esModule", {
    value: !0
});

const const_1 = require("./const");

function sum_1_to_n(t) {
    return t * (t + 1) / 2;
}

function get_prob(t, r) {
    let e = r, o = [], n = 0, u = t - 1;
    for (;u--; ) {
        let r = Math.round(e / t);
        o.push(r), n += r, e -= r;
    }
    let f = r - n;
    return o.unshift(f), o;
}

function get_prob_float(t, r) {
    let e = r, o = [], n = 0, u = t - 1;
    for (;u--; ) {
        let r = e / t;
        o.push(r), n += r, e -= r;
    }
    let f = r - n;
    return o.unshift(f), o;
}

function get_range_by_size_sum(t, r) {
    let e = r = r || sum_1_to_n(t), o = [], n = 0, u;
    for (u = 0; u < t - 1; u++) {
        let r, f = Math.round(e / t);
        o[u] = f, n += o[u], e -= f;
    }
    let f = r - n, _, s;
    for (o[u] = f, o.sort((t, r) => t - r), o.push(e), r < 0 && o.push(r - o[0]), o.push(r - o[o.length - 1]), 
    o.push(e < 0 ? r + t : r - t), u = 0; u < t; u++) o.push(e < 0 ? 0 - u : u);
    return o.push(e < 0 ? r + t - 1 : r - t + 1), o.sort((t, r) => t - r), {
        min: o[0],
        max: o[o.length - 1],
        sum: r,
        resultArray: o
    };
}

function toFixedNumber(t, r) {
    return parseFloat(t.toFixed(r));
}

function array_sum(t) {
    return fixZero(t.reduce((t, r) => t + r));
}

function fixZero(t) {
    return -0 === t ? 0 : t;
}

function floatFromBuffer(t, r = 0) {
    if (r |= 0, t.length < const_1.FLOAT_ENTROPY_BYTES + r || r < 0) throw new RangeError(`buffer must contain at least ${const_1.FLOAT_ENTROPY_BYTES}${r > 0 ? " +" + r : ""} bytes of entropy`);
    return _floatFromBuffer(t, r);
}

function _floatFromBuffer(t, r = 0) {
    let e = 0 + (0 | r);
    return ((((((t[e++] % 32 / 32 + t[e++]) / 256 + t[e++]) / 256 + t[e++]) / 256 + t[e++]) / 256 + t[e++]) / 256 + t[e]) / 256;
}

function _floatFromBuffer2(t, r = 0) {
    return readUInt32BE(t, r) / const_1.MATH_POW_2_32;
}

function readUInt32LE(t, r = 0) {
    return (t[r >>>= 0] | t[r + 1] << 8 | t[r + 2] << 16) + 16777216 * t[r + 3];
}

function readUInt32BE(t, r = 0) {
    return 16777216 * t[r >>>= 0] + (t[r + 1] << 16 | t[r + 2] << 8 | t[r + 3]);
}

exports.sum_1_to_n = sum_1_to_n, exports.get_prob = get_prob, exports.get_prob_float = get_prob_float, 
exports.get_range_by_size_sum = get_range_by_size_sum, exports.toFixedNumber = toFixedNumber, 
exports.array_sum = array_sum, exports.fixZero = fixZero, exports.floatFromBuffer = floatFromBuffer, 
exports._floatFromBuffer = _floatFromBuffer, exports._floatFromBuffer2 = _floatFromBuffer2, 
exports.readUInt32LE = readUInt32LE, exports.readUInt32BE = readUInt32BE, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJjb25zdF8xIiwicmVxdWlyZSIsInN1bV8xX3RvX24iLCJuIiwiZ2V0X3Byb2IiLCJzaXplIiwic3VtIiwic2NvcmUiLCJyZXN1bHRBcnJheSIsInJhbmRvbVRvdGFsIiwiaSIsInJhbmRvbSIsIk1hdGgiLCJyb3VuZCIsInB1c2giLCJyZXN1bHQiLCJ1bnNoaWZ0IiwiZ2V0X3Byb2JfZmxvYXQiLCJnZXRfcmFuZ2VfYnlfc2l6ZV9zdW0iLCJyZXMiLCJtaW4iLCJtYXgiLCJzb3J0IiwiYSIsImIiLCJsZW5ndGgiLCJ0b0ZpeGVkTnVtYmVyIiwiZnJhY3Rpb25EaWdpdHMiLCJwYXJzZUZsb2F0IiwidG9GaXhlZCIsImFycmF5X3N1bSIsIm5hIiwiZml4WmVybyIsInJlZHVjZSIsImZsb2F0RnJvbUJ1ZmZlciIsImJ1ZiIsIm9mZnNldCIsIkZMT0FUX0VOVFJPUFlfQllURVMiLCJSYW5nZUVycm9yIiwiX2Zsb2F0RnJvbUJ1ZmZlciIsInBvc2l0aW9uIiwiX2Zsb2F0RnJvbUJ1ZmZlcjIiLCJyZWFkVUludDMyQkUiLCJNQVRIX1BPV18yXzMyIiwicmVhZFVJbnQzMkxFIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFVBQVVDLFFBQVE7O0FBTXhCLFNBQVNDLFdBQVdDO0lBQ2hCLE9BQU9BLEtBQUtBLElBQUksS0FBSzs7O0FBTXpCLFNBQVNDLFNBQVNDLEdBQU1DO0lBQ3BCLElBQUlDLElBQVFELEdBQ1JFLFFBQ0FDLElBQWMsR0FDZEMsSUFBSUwsSUFBTztJQUNmLE1BQU9LLE9BQUs7UUFDUixJQUFJQyxJQUFTQyxLQUFLQyxNQUFNTixJQUFRRjtRQUNoQ0csRUFBWU0sS0FBS0gsSUFDakJGLEtBQWVFLEdBQ2ZKLEtBQWdCSTs7SUFFcEIsSUFBSUksSUFBU1QsSUFBTUc7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