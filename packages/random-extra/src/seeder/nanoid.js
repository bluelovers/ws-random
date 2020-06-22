/**
 * Created by user on 2018/10/21/021.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const _nanoid = require("nanoid/non-secure");
function nanoid(input, ...argv) {
    return _nanoid();
}
exports.nanoid = nanoid;
exports.default = nanoid;
