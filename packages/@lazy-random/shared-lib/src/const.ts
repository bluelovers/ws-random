
/**
 * 亂數 (Random Number) 與種子 (Seed) 生成常用的進制字串 (Alphabet) 集合。
 * Common alphabets used for random number and seed generation.
 *
 * 以列舉 (Enum) 集中管理，供 `nanoid`、`short-id` 等產生器 (Generator) 選用；
 * 字元順序會影響輸出分布 (Distribution)，非必要請勿更動。
 * Collected in an enum for generators such as `nanoid` and `short-id`;
 * character order affects output distribution, so avoid changing it unless necessary.
 */
export const enum ENUM_ALPHABET
{
	NANOID_URL = 'ModuleSymbhasOwnPr-0123456789ABCDEFGHIJKLNQRTUVWXYZ_cfgijkpqtvxz',
	SHORTID = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_-',
	SHORTID2 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@',
	UNI_CHAR1 = 'ⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⑩⑪⑫',

	DEFAULT = 'ModuleSymbhasOwnPr0123456789ABCDEFGHIJKLNQRTUVWXYZcfgijkpqtvxz0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',

	BASE16 = '0123456789abcdef',
	BASE36 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	BASE58 = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz',
	BASE62 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
	BASE66 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~',
	BASE71 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!\'()*-._~',
}

/**
 * 浮點加總 (Float Sum) 的容差值 (Tolerance)，避免浮點誤差造成判定錯誤。
 * Tolerance for float summation, avoiding misdetection caused by floating point error.
 */
export const SUM_DELTA = 0.00000000000005;
/**
 * 浮點亂數 (Float Random) 攜帶的熵 (Entropy) 位元組數。
 * Number of entropy bytes carried by a float random value.
 */
export const FLOAT_ENTROPY_BYTES = 7;
/**
 * 32 位元無號整數 (Unsigned Integer) 的相關常數：
 * 位元組數、最大值，以及 `2 ** 32` 供位元運算使用。
 * Constants for 32-bit unsigned integers: byte count, max value, and `2 ** 32` for bitwise math.
 */
export const UINT32_BYTES = 4;
export const UINT32_VALUE = 0xffffffff;
export const MATH_POW_2_32 = Math.pow(2, 32);

/**
 * 位元組 (Byte) 對十六進制 (Hex) 字串的查找表 (Lookup Table)，分大小寫兩份。
 * Lookup tables mapping bytes to hex strings, in lower and upper case variants.
 *
 * 以 `let` 宣告後再凍結 (Freeze)，兼顧模組初始化時的逐步填寫與外部唯讀需求。
 * Declared with `let` so the table can be filled during module init, then frozen for read-only use.
 */
export let BYTE_TO_HEX_TO_LOWER_CASE: ReadonlyArray<string> = [];
export let BYTE_TO_HEX_TO_UPPER_CASE: ReadonlyArray<string> = [];

/**
 * 預先產生 0～255 的兩碼十六進制字串：
 * 以查找表取代每次呼叫 `.toString(16)`，可減少熱路徑 (Hot Path) 上的字串配置 (Allocation)。
 * Pre-generate two-digit hex strings for 0-255: a lookup table avoids calling
 * `.toString(16)` on every request, saving string allocations on hot paths.
 *
 * `(i + 0x100).toString(16).substr(1)` 保底補零，確保結果恆為兩碼。
 * `(i + 0x100).toString(16).substr(1)` pads with a leading zero to keep two digits.
 */
for (let i = 0; i < 256; ++i)
{
	// @ts-ignore
	BYTE_TO_HEX_TO_LOWER_CASE[i] = (i + 0x100).toString(16).substr(1);
	// @ts-ignore
	BYTE_TO_HEX_TO_UPPER_CASE[i] = BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase()
}

/**
 * 凍結 (Freeze) 兩份查找表 (Lookup Table)，防止執行期被改寫而破壞十六進制轉換結果。
 * Freeze both lookup tables so runtime mutation cannot corrupt hex conversion results.
 */
// @ts-ignore
BYTE_TO_HEX_TO_LOWER_CASE = Object.freeze(BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
BYTE_TO_HEX_TO_UPPER_CASE = Object.freeze(BYTE_TO_HEX_TO_UPPER_CASE);

;
