/**
 * make easy replace to other ow like lib
 */
//import ow from 'ow-lite-ts'
//import ow = require('ow-lite-ts');
import _chai = require('chai');
//import { Assertion } from 'chai'
//import { expect, assert } from 'chai'
import { ChaiPlugin } from 'chai-asserttype-extra'
//import { assert } from 'chai'
import { isFloat, isInt } from '../util';

const chai = ChaiPlugin.install(_chai);

const expect = chai.expect;
//const assert = chai.assert;

//export { ow }
//export { assert, chai }
export { expect }

export default expect

// @ts-ignore
Object.freeze(exports)
