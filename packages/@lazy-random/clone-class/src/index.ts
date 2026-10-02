/**
 * 判斷要用哪一個類別 (Class) 來建立新實例
 * Determine which class should be used to create a new instance
 *
 * 若 thisArgv 已是 RNGClass 的實例，回傳該實例實際所屬的建構子
 * （如此以來子類別 (Subclass) 的行為不會在複製時遺失）；否則直接回傳 RNGClass。
 * When thisArgv is already an instance of RNGClass, return its actual constructor
 * so a subclass keeps its behaviour after cloning; otherwise return RNGClass itself.
 *
 * @todo support typescript
 *
 * @param RNGClass 基準的 RNG 類別 / the base RNG class
 * @param thisArgv 現有實例，用來判斷實際所屬的類別 / an existing instance used to detect the actual class
 * @param ...argv 相容呼叫簽章的多餘參數，目前未被使用 /
 * extra arguments accepted to match the call signature; currently unused
 * @returns 適合用來建立新實例的建構子 (Constructor) / the constructor suitable for creating a new instance
 */
export function getClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T
{
	let o;

	/**
	 * 只有在 thisArgv 確實是 RNGClass 的實例時才取用其實際建構子，
	 * 否則（例如傳進來的是普通物件）退回傳入的 RNGClass，避免 new 到錯誤的類別。
	 * Only adopt the instance's own constructor when thisArgv really is an instance of
	 * RNGClass; otherwise (e.g. a plain object) fall back to RNGClass itself so that
	 * `new` is not called on the wrong type.
	 */
	if (thisArgv instanceof RNGClass)
	{
		// @ts-ignore
		o = (thisArgv.__proto__.constructor)
	}
	else
	{
		o = RNGClass
	}

	return o
}

/**
 * 以相同的類別複製 (Clone) 出一個新的 RNG 實例
 * Clone an RNG instance by creating a new one from the same class
 *
 * 先由 getClass 決定實際的類別，再以傳入的 ...argv 建立新實例，
 * 常用於複製 RNG 狀態並分岔 (Fork) 出獨立的隨機序列。
 * Let getClass decide the actual class, then build a new instance with the given ...argv;
 * typically used to duplicate RNG state and fork an independent random stream.
 *
 * @todo support typescript
 *
 * @param RNGClass 基準的 RNG 類別 / the base RNG class
 * @param thisArgv 現有實例，決定新實例所使用的類別 / an existing instance that determines the class of the new instance
 * @param ...argv 傳給新實例建構子的參數 / arguments passed to the new instance's constructor
 * @returns 新建立的實例 / the newly created instance
 */
export function cloneClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T
{
	let o = getClass(RNGClass, thisArgv, ...argv)

	// @ts-ignore
	return new o(...argv)
}

export default cloneClass
