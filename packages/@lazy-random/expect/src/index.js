"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assert = exports.expect = void 0;
const chai_1 = __importDefault(require("chai"));
const chai_asserttype_extra_1 = require("chai-asserttype-extra");
const chai = chai_asserttype_extra_1.ChaiPlugin.install(chai_1.default);
exports.expect = chai.expect;
exports.assert = chai.assert;
exports.default = exports.expect;
//# sourceMappingURL=index.js.map