/**
 * Created by user on 2018/10/22/022.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultArgv = Object.freeze({
    int: Object.freeze([0, 100]),
    integer: Object.freeze([0, 100]),
    boolean: Object.freeze([0.5]),
    bytes: Object.freeze([1]),
});
function simpleWrap(fn) {
    let self = {
        next() {
            return fn();
        },
        random() {
            return fn();
        },
        float(min = 0, max = 1) {
            return (fn() * (max - min + 1) + min);
        },
        int(min = 0, max = 100) {
            return (fn() * (max - min + 1) + min) | 0;
        },
        get integer() {
            return self.int;
        },
        boolean(likelihood = 0.5) {
            return (fn() >= likelihood);
        },
        byte() {
            return self.int(0, 255);
        },
        bytes(size = 1) {
            let arr = [];
            for (let i = 0; i < size; i++) {
                arr.push(self.byte());
            }
            return arr;
        },
        seed(...argv) {
            return self;
        },
    };
    return self;
}
exports.simpleWrap = simpleWrap;
exports.default = simpleWrap;
// @ts-ignore
Object.freeze(exports);
