import { float, int, randIndex } from './distributions';

export * from './distributions';

/**
 * 彙整 `randIndex`、`float`、`int` 的預設導出 (Default Export) 集合，
 * 便於以屬性 (Property) 方式一次取得常用分布工具。
 * Default export bundling `randIndex`, `float`, and `int` for property-style access
 * to the common distribution utilities.
 */
const UtilDistributions = {
	randIndex,
	float,
	int,
};

export default UtilDistributions;
