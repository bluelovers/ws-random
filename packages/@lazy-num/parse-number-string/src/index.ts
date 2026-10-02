
/**
 * 整數字串 (Integer String)：可選正負號，後接純數字
 * Integer string: optional sign followed by digits only
 *
 * 純小數字串 (Float-only String)：小數點前的數字可省略（如 '.5'），但小數點後必須有數字，因此 '1.' 會被拒絕
 * Float-only string: digits before the dot may be omitted ('.5'), but digits
 * after it are required, so a trailing dot like '1.' is rejected
 *
 * 前兩者的聯集，作為 isFloatString 的判斷依據
 * Union of both patterns, used as the check for isFloatString
 */
const reInt = /^[+-]?\d+$/;
const reFloatOnly = /^[+-]?(?:\d+)?\.\d+$/;
const reFloat = new RegExp(reInt.source + '|' + reFloatOnly.source);

/**
 * 判斷輸入是否為整數字串，通過時以型別守衛 (Type Guard) 縮窄為 T（預設為 `${number}`）
 *
 * Whether the input is an integer string; on success it narrows input to T
 * (defaults to `${number}`) via a type guard
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為整數字串 / whether it is an integer string
 */
export function isIntString<T extends `${number}` | string = `${number}`>(input: unknown): input is T
{
	/**
	 * 先以 typeof 確認是字串再測試正則：RegExp.test() 會對非字串做型別轉換
	 * （例如 123 → '123'），可能讓非字串意外通過，因此需要嚴格把關
	 *
	 * Check typeof before the regex: RegExp.test() coerces non-strings
	 * (e.g. 123 → '123'), which could let other types pass, so the guard is strict
	 */
	return (typeof input === 'string' && reInt.test(input))
}

/**
 * 判斷輸入是否為純小數字串（必須含小數點且點後有數字）
 *
 * Whether the input is a float-only string (must contain a dot with digits after it)
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為純小數字串 / whether it is a float-only string
 */
export function isFloatOnlyString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T
{
	/**
	 * 與 isIntString 相同：先用 typeof 擋下非字串，避免 RegExp.test() 的型別轉換造成誤判
	 *
	 * Same as isIntString: typeof blocks non-strings so RegExp.test()
	 * coercion cannot produce a false positive
	 */
	return (typeof input === 'string' && reFloatOnly.test(input))
}

/**
 * 判斷輸入是否為整數或小數字串（前兩者的聯集）
 *
 * Whether the input is an integer or float string (union of both patterns)
 *
 * @param input 任意輸入值 / any input value
 * @returns 是否為整數或小數字串 / whether it is an integer or float string
 */
export function isFloatString<T extends `${number}` | string = `${number}`>(input: unknown | T): input is T
{
	/**
	 * 與 isIntString 相同：先用 typeof 擋下非字串，避免 RegExp.test() 的型別轉換造成誤判
	 *
	 * Same as isIntString: typeof blocks non-strings so RegExp.test()
	 * coercion cannot produce a false positive
	 */
	return (typeof input === 'string' && reFloat.test(input))
}

/**
 * 解析函式共用的驗證簽名 (Validator Signature)：泛型型別守衛或一般型別守衛皆可
 *
 * Shared validator signature for the parse helpers: accepts either the
 * generic type guard or a plain type guard
 */
export type IParseNumberFn = (<T extends `${number}` | string = `${number}`>(input: unknown | T) => input is T) | ((input: unknown) => input is`${number}`)

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
export function _parseNumberString<T extends number>(validFn: IParseNumberFn, input: unknown | T | `${T}`): T
{
	/**
	 * 解析流程依序為：
	 * 1. validFn 判斷字串格式，符合就以 Number() 轉成數值
	 * 2. 檢查失敗時，只有真正的 number 會被放行，其他型別一律丟 TypeError，不猜測字串以外的轉換規則
	 * 3. 放行的數值原樣回傳且不再驗證，因此 NaN、Infinity 也會被當作合法值
	 *
	 * Flow: validFn checks the string and Number() converts it; if the check
	 * fails only a real number is passed through and everything else throws a
	 * TypeError; passed-through numbers are not re-validated, so NaN and
	 * Infinity are accepted as well
	 */
	if (validFn(input))
	{
		return Number(input) as T
	}

	if (typeof input !== 'number')
	{
		throw new TypeError(`Invalid value: ${input}`)
	}

	return input as T
}

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
export function parseIntString<T extends number>(input: T): T
export function parseIntString<T extends number>(input: `${T}`): T
export function parseIntString<T extends number>(input: unknown | T | `${T}`): T
export function parseIntString<T extends number>(input: unknown | T | `${T}`): T
{
	return _parseNumberString(isIntString, input)
}

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
export function parseFloatOnlyString<T extends number>(input: T): T
export function parseFloatOnlyString<T extends number>(input: `${T}`): T
export function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T
export function parseFloatOnlyString<T extends number>(input: unknown | T | `${T}`): T
{
	return _parseNumberString(isFloatOnlyString, input)
}

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
export function parseFloatString<T extends number>(input: T): T
export function parseFloatString<T extends number>(input: `${T}`): T
export function parseFloatString<T extends number>(input: unknown | T | `${T}`): T
export function parseFloatString<T extends number>(input: unknown | T | `${T}`): T
{
	/**
	 * isFloatString 的泛型簽名與共用核心要求的參數型別不完全相容，以 as any 轉型後再交給核心處理
	 *
	 * The generic signature of isFloatString does not line up exactly with
	 * what the shared core expects, so `as any` bridges the two
	 */
	return _parseNumberString(isFloatString, input as any)
}

export default parseFloatString
