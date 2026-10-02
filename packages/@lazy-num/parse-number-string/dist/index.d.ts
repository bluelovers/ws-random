/**
 * 判斷輸入是否為整數字串，通過時以型別守衛 (Type Guard) 縮窄為 T（預設為 `${number}`）
 *
 * Whether the input is an integer string; on success it narrows input to T
 * (defaults to `${number}`) via a type guard
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為整數字串 / whether it is an integer string
 */
export declare function isIntString<T extends `${number}` | string = `${number}`>(input: unknown): input is T;
/**
 * 判斷輸入是否為純小數字串（必須含小數點且點後有數字）
 *
 * Whether the input is a float-only string (must contain a dot with digits after it)
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為純小數字串 / whether it is a float-only string
 */
export declare function isFloatOnlyString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T;
/**
 * 判斷輸入是否為整數或小數字串（前兩者的聯集）
 *
 * Whether the input is an integer or float string (union of both patterns)
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為整數或小數字串 / whether it is an integer or float string
 */
export declare function isFloatString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T;
/**
 * 解析函式共用的驗證簽名 (Validator Signature)：泛型型別守衛或一般型別守衛皆可
 *
 * Shared validator signature for the parse helpers: accepts either the
 * generic type guard or a plain type guard
 */
export type IParseNumberFn = (<T extends `${number}` | string = `${number}`>(input: unknown | T) => input is T) | ((input: unknown) => input is `${number}`);
/**
 * 解析核心 (Parsing Core)：先用 validFn 檢查字串格式，再決定轉換、放行或丟錯
 *
 * Shared parsing core: validate the string with validFn, then convert,
 * pass through or throw
 *
 * @param validFn 字串格式的型別守衛 / type guard used to validate the string format
 * @param input 數值或數字字串 / a number or number string
 * @returns 解析後的數值 / the resulting number
 * @throws {TypeError} 輸入不是 number 且字串格式不符 / when input is neither a number nor a matching string
 */
export declare function _parseNumberString<T extends number>(validFn: IParseNumberFn, input: unknown | T | `${T}`): T;
/**
 * 解析整數字串為數值；數值輸入不經驗證直接回傳
 *
 * Parse an integer string into a number; numeric input passes through
 * without validation
 *
 * @param input 整數字串或數值 / an integer string or a number
 * @returns 對應的數值 / the corresponding number
 * @throws {TypeError} 字串不符整數格式或輸入非 number / when the string is not an integer format or the input is not a number
 */
export declare function parseIntString<T extends number>(input: T): T;
export declare function parseIntString<T extends number>(input: `${T}`): T;
export declare function parseIntString<T extends number>(input: unknown | T | `${T}`): T;
/**
 * 解析純小數字串為數值；數值輸入不經驗證直接回傳
 *
 * Parse a float-only string into a number; numeric input passes through
 * without validation
 *
 * @param input 含小數點的數字字串或數值 / a dotted number string or a number
 * @returns 對應的數值 / the corresponding number
 * @throws {TypeError} 字串不符純小數格式或輸入非 number / when the string is not a float-only format or the input is not a number
 */
export declare function parseFloatOnlyString<T extends number>(input: T): T;
export declare function parseFloatOnlyString<T extends number>(input: `${T}`): T;
export declare function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T;
/**
 * 解析整數或小數字串為數值；亦為本套件的預設匯出 (Default Export)
 *
 * Parse an integer or float string into a number; this is also the default
 * export of this package
 *
 * @param input 整數／小數字串或數值 / an integer or float string, or a number
 * @returns 對應的數值 / the corresponding number
 * @throws {TypeError} 字串不符整數或小數格式或輸入非 number / when the string matches neither format or the input is not a number
 */
export declare function parseFloatString<T extends number>(input: T): T;
export declare function parseFloatString<T extends number>(input: `${T}`): T;
export declare function parseFloatString<T extends number>(input: unknown | T | `${T}`): T;

export {
	parseFloatString as default,
};

export {};
