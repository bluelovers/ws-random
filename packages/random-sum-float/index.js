"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSumFloat = exports.create = void 0;
const random_extra_1 = require("random-extra");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return random_extra_1.dfSumFloat; } });
function randomSumFloat(size, sum, min, max) {
    return random_extra_1.dfSumFloat(size, sum, min, max)();
}
exports.randomSumFloat = randomSumFloat;
exports.default = randomSumFloat;
//# sourceMappingURL=index.js.map