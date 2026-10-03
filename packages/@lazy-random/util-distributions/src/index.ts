import { float, int, randIndexByLength, randIndexWithRange } from './distributions';

export * from './distributions';
export * from './utils';
export * from './utils-array';

/**
 * 彙整 `randIndexByLength`、`float`、`int` 的預設導出 (Default Export) 集合，
 * 便於以屬性 (Property) 方式一次取得常用分布工具。
 * Default export bundling `randIndexByLength`, `float`, and `int` for property-style access
 * to the common distribution utilities.
 */
const UtilDistributions = {
	randIndexByLength,
	randIndexWithRange,
	float,
	int,
};

export default UtilDistributions;
