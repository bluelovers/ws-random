/// <reference types="chai" />
/**
 * make easy replace to other ow like lib
 */
import ow = require('ow-lite-ts');
declare const chai: import("chai-asserttype-extra/lib/type").IOverwrite<Chai.ChaiStatic, {
    expect: import("chai-asserttype-extra/lib/type").IAssertionStatic<import("chai-asserttype-extra").IAssertionInstalled>;
}>;
declare const expect: import("chai-asserttype-extra/lib/type").IAssertionStatic<import("chai-asserttype-extra").IAssertionInstalled>;
declare const assert: Chai.AssertStatic;
export { ow };
export { expect, assert, chai };
export default expect;
