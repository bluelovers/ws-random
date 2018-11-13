/// <reference types="chai" />
/**
 * make easy replace to other ow like lib
 */
import ow = require('ow-lite-ts');
declare const chai: Chai.ChaiStatic;
declare const expect: Chai.ExpectStatic;
declare const assert: Chai.AssertStatic;
export { ow };
export { expect, assert, chai };
export default expect;
