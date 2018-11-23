
export enum ENUM_ALPHABET
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

export const SUM_DELTA = 0.00000000000005;
export const FLOAT_ENTROPY_BYTES = 7;

export let BYTE_TO_HEX_TO_LOWER_CASE: ReadonlyArray<string> = [];
export let BYTE_TO_HEX_TO_UPPER_CASE: ReadonlyArray<string> = [];

for (let i = 0; i < 256; ++i)
{
	// @ts-ignore
	BYTE_TO_HEX_TO_LOWER_CASE[i] = (i + 0x100).toString(16).substr(1);
	// @ts-ignore
	BYTE_TO_HEX_TO_UPPER_CASE[i] = BYTE_TO_HEX_TO_LOWER_CASE[i].toUpperCase()
}

// @ts-ignore
BYTE_TO_HEX_TO_LOWER_CASE = Object.freeze(BYTE_TO_HEX_TO_LOWER_CASE);
// @ts-ignore
BYTE_TO_HEX_TO_UPPER_CASE = Object.freeze(BYTE_TO_HEX_TO_UPPER_CASE);

// @ts-ignore
Object.freeze(exports);
