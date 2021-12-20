import _chai from 'chai';
import { install } from 'chai-asserttype-extra'

export type { IChaiInstalled } from 'chai-asserttype-extra'

const chai = install(_chai);

export const expect = chai.expect;
export const assert = chai.assert;

export default expect
