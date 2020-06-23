"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._handle = void 0;
const __root_ws_1 = __importDefault(require("../../__root_ws"));
function _handle(module_name) {
    let _ok = true;
    let options = {
        name: module_name,
        prefix: `packages/${module_name}`,
        cwd: __root_ws_1.default,
    };
    switch (module_name) {
        case 'random-extra':
            options.remote = `https://github.com/bluelovers/random.git`;
            break;
        default:
            _ok = false;
            break;
    }
    return {
        module_name,
        _ok,
        options,
    };
}
exports._handle = _handle;
//# sourceMappingURL=data.js.map