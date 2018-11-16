/// <reference types="chai" />
declare const chai: import("ts-type").ITSOverwrite<Chai.ChaiStatic, {
    expect: import("chai-asserttype-extra/lib/type").IAssertionStatic<import("chai-asserttype-extra").IAssertionInstalled>;
}>;
declare const expect: import("chai-asserttype-extra/lib/type").IAssertionStatic<import("chai-asserttype-extra").IAssertionInstalled>;
declare const assert: Chai.AssertStatic;
export { expect, assert, chai };
export default expect;
