import {
	use,
} from 'chai';
import { ChaiPluginAssertType } from 'chai-asserttype-extra'

const chai = use(ChaiPluginAssertType);

export const expect = chai.expect;
export const assert = chai.assert;

export default expect
