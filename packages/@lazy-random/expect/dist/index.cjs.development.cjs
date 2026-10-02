'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var chai$1 = require('chai');
var chaiAsserttypeExtra = require('chai-asserttype-extra');

/**
 * @lazy-random/expect
 *
 * 匯出已套用 chai-asserttype-extra 外掛 (Plugin) 的 Chai 斷言 (Assertion)，
 * 讓使用端不必在每個測試檔重複呼叫 chai.use()。
 *
 * Exports Chai assertions with the chai-asserttype-extra plugin pre-applied,
 * so consumers do not need to call chai.use() in every test file.
 */
const chai = /*#__PURE__*/chai$1.use(chaiAsserttypeExtra.ChaiPluginAssertType);
const expect = chai.expect;
const assert = chai.assert;

exports.assert = assert;
exports.default = expect;
exports.expect = expect;
//# sourceMappingURL=index.cjs.development.cjs.map
