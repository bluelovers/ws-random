
import _chai from 'chai';
import { ChaiPlugin } from 'chai-asserttype-extra'

const chai = ChaiPlugin.install(_chai);

export const expect = chai.expect;
export const assert = chai.assert;

export default expect
