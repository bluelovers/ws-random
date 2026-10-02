
/**
 * 檢查 n 與 n+1 之間的基本運算是否已失效（精度不足以區分相鄰數值），精確到小數點後 `digits` 位
 *
 * Check whether basic arithmetic breaks between n and n+1, meaning the value
 * can no longer be distinguished from its neighbour, to a precision of `digits`
 * after the decimal point
 *
 * @param n 要檢查的數值 / the number to check
 * @param digits 小數位數，決定累加步進 10 ** -digits / fraction digits, which set the step 10 ** -digits
 * @returns 是否不安全 / whether n is unsafe at this precision
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
export function isUnsafe(n: number, digits: number)
{
	// digits = 1 loops 10 times with 0.1 increases.
	// digits = 2 means 100 steps of 0.01, and so on.
	let prev = n;
	/**
	 * 以 10 ** -digits 為步進累加到 1，每一步都把結果存進 prev：
	 * 若某次 n + i 與前一次結果相同，代表增量已被捨入 (Rounding) 吞掉，
	 * 在這個精度下 n 已無法與相鄰數值區分
	 *
	 * Accumulate in steps of 10 ** -digits up to 1, keeping each result in
	 * prev; when n + i stops changing, the increment was rounded away and n
	 * can no longer be distinguished from its neighbour at this precision
	 */
	for (let i = 10 ** -digits; i < 1; i += 10 ** -digits)
	{
		/**
		 * 加法結果與前一步完全相同，代表精度已不足以表達該增量，立即判定為不安全
		 *
		 * An identical result to the previous step means the precision cannot
		 * express the increment, so n is reported unsafe right away
		 */
		if (n + i === prev)
		{ // eg 10.2 === 10.1
			return true;
		}
		prev = n + i;
	}
	return false;

}

/**
 * 在 0 與 Number.MAX_SAFE_INTEGER（2**53 - 1）之間以二分搜尋找出在 `digits` 位精度下最大的安全數值
 *
 * Binary search between 0 and Number.MAX_SAFE_INTEGER (2**53 - 1) for the biggest number that is safe to the `digits` level of precision.
 * digits=9 took ~30s, I wouldn't pass anything bigger.
 *
 * @param digits 小數位數 / fraction digits
 * @param log 是否以 console.table() 輸出每次搜尋狀態 / whether to print each search step with console.table()
 * @returns 該精度下最大的安全數值 / the biggest safe number at this precision
 *
 * TODO: digits <= 0 時 isUnsafe() 恆為 false，lastUnsafe 會保持 undefined，n 隨後變成 NaN 而讓迴圈無限執行
 * TODO: 若搜尋先收斂到 lastSafe 與 lastUnsafe 相鄰、且下一個 n 落在不安全側，Math.round() 會反覆取到同一值而無法收斂
 *
 * @see https://stackoverflow.com/a/57225494/4563339
 */
export function findMaxSafeFloat(digits: number, log = false)
{
	/**
	 * 搜尋狀態：n 為目前候選值、lastSafe 為已確認安全的下界、lastUnsafe 為已確認不安全的上界
	 *
	 * Search state: n is the current candidate, lastSafe the known-safe lower
	 * bound and lastUnsafe the known-unsafe upper bound
	 */
	let n = Number.MAX_SAFE_INTEGER;
	let lastSafe = 0;
	let lastUnsafe = undefined;
	/**
	 * 二分搜尋 (Binary Search) 主迴圈：反覆以中點測試並移動上下界，
	 * 直到找到「安全且緊鄰下界」的 n（lastSafe + 1 === n）才回傳，代表已逼近到可分辨的極限
	 *
	 * Main binary-search loop: test the midpoint and move the bounds until a
	 * safe n adjacent to the lower bound (lastSafe + 1 === n) is found, which
	 * means the search has closed in as far as representable
	 */
	while (true)
	{
		/**
		 * 側邊的偵錯輸出：log 為 true 時把目前的搜尋狀態印成表格，方便觀察每次收窄的區間
		 *
		 * Side-channel debug output: when log is true, print the current search
		 * state as a table so each narrowing step can be inspected
		 */
		if (log)
		{
			console.table({
				'': {
					n,
					'Relative to Number.MAX_SAFE_INTEGER': `(MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1`,
					lastSafe,
					lastUnsafe,
					'lastUnsafe - lastSafe': lastUnsafe - lastSafe,
				},
			});
		}
		/**
		 * 依檢查結果移動邊界：不安全就把上界 lastUnsafe 收緊到 n；
		 * 安全則先檢查是否已緊鄰下界（收斂完成），否則抬升下界 lastSafe
		 *
		 * Move a bound by the check result: unsafe tightens the upper bound to
		 * n, while safe first tests for convergence and otherwise raises the
		 * lower bound
		 */
		if (isUnsafe(n, digits))
		{
			lastUnsafe = n;
		}
		else
		{ // safe
			if (lastSafe + 1 === n)
			{ // Closed in as far as possible
				console.log(`\n\nMax safe number to a precision of ${digits} digits after the decimal point: ${n}\t((MAX + 1) / ${(Number.MAX_SAFE_INTEGER + 1) / (n + 1)} - 1)\n\n`);
				return n;
			}
			else
			{
				/**
				 * n 安全但尚未緊鄰下界，把下界抬升到 n 以縮小搜尋區間
				 *
				 * n is safe but not yet adjacent to the lower bound, so raise
				 * the bound to n and keep narrowing the interval
				 */
				lastSafe = n;
			}
		}
		/**
		 * 取上下界的中點作為下一個候選值；Math.round() 讓中點落在整數上，
		 * 但 lastUnsafe 尚未被賦值（例如 isUnsafe 恆為 false）時運算會得到 NaN
		 *
		 * The midpoint of both bounds becomes the next candidate; Math.round()
		 * keeps it an integer, but it evaluates to NaN when lastUnsafe has
		 * never been assigned (for example when isUnsafe always returns false)
		 */
		n = Math.round((lastSafe + lastUnsafe) / 2);
	}
}

/**
 * digits = 1 時的最大安全數值
 *
 * The max safe value found for digits = 1
 *
 * @remarks 模組載入時即執行一次二分搜尋並 console.log() 輸出結果，import 本套件即會在 console 多出一行文字
 * Computed at module load with one binary search and a console.log(), so
 * importing this package prints an extra line to the console
 */
export const MAX_SAFE_FLOAT = findMaxSafeFloat(1);

export default findMaxSafeFloat
