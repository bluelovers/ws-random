"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomSeedStr = void 0;
const hash_sum_1 = __importDefault(require("hash-sum"));
const non_secure_1 = require("nanoid/non-secure");
const random_seed_str_data_1 = __importDefault(require("./random-seed-str.data"));
const to_string_1 = require("./to-string");
const _random_1 = require("./_random");
/**
 * give a random string for create seed
 */
function randomSeedStr() {
    return [
        non_secure_1.nanoid(),
        hash_sum_1.default(random_seed_str_data_1.default.name),
        hash_sum_1.default(random_seed_str_data_1.default.version),
        Date.now(),
        to_string_1.floatToString(_random_1._MathRandom()),
    ].join('_');
}
exports.randomSeedStr = randomSeedStr;
//# sourceMappingURL=random-seed-str.js.map