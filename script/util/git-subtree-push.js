"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitSubtreePush = void 0;
const logger_1 = __importDefault(require("debug-color2/logger"));
const fs_extra_1 = require("fs-extra");
const create_cache_name_1 = __importDefault(require("./create-cache-name"));
const subtree_1 = require("@git-lazy/subtree");
const data_1 = require("./data");
async function gitSubtreePush(module_name) {
    let { _ok, options } = data_1._handle(module_name);
    if (_ok) {
        await subtree_1.subtreePush(options);
    }
    let file = create_cache_name_1.default('subtree', module_name);
    if (fs_extra_1.pathExistsSync(file)) {
        (_ok ? logger_1.default : logger_1.default.red).debug(`[subtree:script]`, `del`, module_name);
        fs_extra_1.unlinkSync(file);
    }
}
exports.gitSubtreePush = gitSubtreePush;
//# sourceMappingURL=git-subtree-push.js.map