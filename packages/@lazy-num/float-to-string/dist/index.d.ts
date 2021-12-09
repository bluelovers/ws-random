export declare function assertFractionDigits(fractionDigits?: number): asserts fractionDigits is number;
export declare function splitFloatNumberToString(float: string | number): [
	string,
	string?
];
export declare function getFractionDigitsString(float: string | number): string;
export declare function splitFloatNumber(n: number): [
	number,
	number
];
export declare function joinFloatNumber(int: number | string, float?: string): string;
export declare function floatToString(n: number, fractionDigits?: number): string;
export default floatToString;

export {};
