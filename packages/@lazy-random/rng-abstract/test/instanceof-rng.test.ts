/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 測試 `rng-abstract` 自帶的自我驗證 instanceof 工具，寫法參考 `test/temp.ts`
 * Tests the self-verifying instanceof utilities of `rng-abstract`, modeled on `test/temp.ts`
 *
 * - `instanceof RNG`                     → 原生寫法仍可用 / the native form still works
 * - `_isInstanceOfRNG()`                 → 布林判斷 / boolean check
 * - `_assertInstanceOfRNG()`             → 斷言，失敗拋 `RNGInstanceOfError` / assertion throwing `RNGInstanceOfError`
 * - `_hasRNGBrand()`                     → 品牌鍵 (Brand Key) 檢查 / brand-key check
 * - `_getExpectRNGMessage()`             → 預設失敗訊息 / default failure message
 * - `_isInstanceofAssertionOrRNGError()` → 同時接受新舊兩種錯誤 / accepts both error kinds
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import RNG, {
	RNGInstanceOfError,
	_assertInstanceOfRNG,
	_getExpectRNGMessage,
	_hasRNGBrand,
	_isInstanceofAssertionOrRNGError,
	_isInstanceOfRNG,
} from '../src';

/**
 * 可通過驗證的具體實作，對應 `test/temp.ts` 的 `MyTestRNG`
 * A concrete RNG that passes the checks, mirroring `MyTestRNG` in `test/temp.ts`
 */
class TestRNG extends RNG
{
	public override get name(): string
	{
		return 'test-rng'
	}

	public override next(): number
	{
		return 0.123456789
	}
}

/**
 * 不屬於 RNG 家族的類別，對應 `test/temp.ts` 的 `MyTestNotRNG`
 * A class outside the RNG family, mirroring `MyTestNotRNG` in `test/temp.ts`
 */
class NotRNG
{
}

/**
 * 不該通過驗證的輸入
 * Inputs that must not pass the checks
 *
 * 鴨子型別的假物件用來確認這是「真的 instanceof 檢查」而非結構檢查
 * The duck-typed fake proves it is a real `instanceof` check, not a structural one
 */
const invalidRngList: [label: string, value: unknown][] = [
	['undefined', undefined],
	['null', null],
	['number', 42],
	['string', 'rng'],
	['boolean', true],
	['Math.random', Math.random],
	['NotRNG instance', new NotRNG()],
	['plain object', { next: () => 0.5 }],
	['duck-typed fake RNG', { next: () => 0.5, seed() {}, name: 'fake-rng', seedable: true }],
];

describe(`_isInstanceOfRNG()`, () =>
{
	test(`RNG 實例回傳 true，且與原生 instanceof 一致`, () =>
	{
		// @ts-ignore
		const rng = new TestRNG();

		assert.strictEqual(_isInstanceOfRNG(rng), true);
		assert.strictEqual(rng instanceof RNG, true);
	});

	invalidRngList.forEach(([label, value]) =>
	{
		test(`${label} 應回傳 false`, () =>
		{
			assert.strictEqual(_isInstanceOfRNG(value), false);
		});
	});
});

describe(`instanceof RNG`, () =>
{
	test(`RNG 實例通過檢查`, () =>
	{
		// @ts-ignore
		assert.ok(new TestRNG() instanceof RNG);
	});

	invalidRngList.forEach(([label, value]) =>
	{
		test(`${label} 應不通過 instanceof RNG`, () =>
		{
			assert.ok(!(value instanceof RNG), label);
		});
	});
});

describe(`_assertInstanceOfRNG()`, () =>
{
	test(`合法 RNG 實例不拋錯`, () =>
	{
		// @ts-ignore
		const rng = new TestRNG();

		assert.doesNotThrow(() => _assertInstanceOfRNG(rng));
		assert.doesNotThrow(() => _assertInstanceOfRNG<TestRNG>(rng));
	});

	invalidRngList.forEach(([label, value]) =>
	{
		test(`${label} 應拋出 RNGInstanceOfError`, () =>
		{
			assert.throws(() => _assertInstanceOfRNG(value), RNGInstanceOfError);
		});
	});

	test(`預設訊息取自 _getExpectRNGMessage()`, () =>
	{
		assert.throws(() => _assertInstanceOfRNG(42),
			(err: unknown) => err instanceof RNGInstanceOfError
				&& err.message === _getExpectRNGMessage(42));
	});

	test(`可透過第二個參數覆寫本次訊息`, () =>
	{
		assert.throws(() => _assertInstanceOfRNG(42, 'custom message'),
			(err: unknown) => err instanceof RNGInstanceOfError
				&& err.message === 'custom message');
	});
});

describe(`_hasRNGBrand()`, () =>
{
	test(`原型上帶品牌鍵的值回傳真值`, () =>
	{
		// @ts-ignore
		const rng = new TestRNG();

		/**
		 * `Object.create(rng)` 的原型即為 RNG 實例，而實例本身帶有品牌鍵欄位
		 * The prototype of `Object.create(rng)` is the RNG instance, which carries the brand-key field
		 */
		assert.ok(_hasRNGBrand(Object.create(rng)));
	});

	test(`原始型別回傳 false`, () =>
	{
		assert.strictEqual(_hasRNGBrand(undefined), false);
		assert.strictEqual(_hasRNGBrand(null), false);
		assert.strictEqual(_hasRNGBrand(0), false);
		assert.strictEqual(_hasRNGBrand(42), false);
		assert.strictEqual(_hasRNGBrand('rng'), false);
		assert.strictEqual(_hasRNGBrand(true), false);
	});

	test(`原型上沒有品牌鍵的物件不為真`, () =>
	{
		assert.ok(!_hasRNGBrand(new NotRNG()));
		assert.ok(!_hasRNGBrand({ next: () => 0.5 }));
	});
});

describe(`_getExpectRNGMessage()`, () =>
{
	test(`依值產生預設失敗訊息`, () =>
	{
		assert.strictEqual(_getExpectRNGMessage(42), 'expected [Number] 42 to be an instance of RNG');
		assert.strictEqual(_getExpectRNGMessage(undefined), 'expected [unknown] undefined to be an instance of RNG');
		assert.strictEqual(_getExpectRNGMessage(new NotRNG()), 'expected [NotRNG] [object Object] to be an instance of RNG');
	});
});

describe(`_isInstanceofAssertionOrRNGError()`, () =>
{
	test(`接受 _assertInstanceOfRNG() 拋出的錯誤`, () =>
	{
		assert.ok(_isInstanceofAssertionOrRNGError(new RNGInstanceOfError()));
	});

	test(`接受舊版 chai AssertionError 形狀的錯誤`, () =>
	{
		const err = Object.assign(new Error('expected 42 to be an instance of RNG'), {
			name: 'AssertionError',
		});

		assert.ok(_isInstanceofAssertionOrRNGError(err));
	});

	test(`其餘輸入回傳 false`, () =>
	{
		assert.strictEqual(_isInstanceofAssertionOrRNGError(new Error('boom')), false);
		assert.strictEqual(_isInstanceofAssertionOrRNGError(undefined), false);
		assert.strictEqual(_isInstanceofAssertionOrRNGError('AssertionError'), false);
	});

	test(`可直接作為 assert.throws 的驗證函式`, () =>
	{
		assert.throws(() => _assertInstanceOfRNG(new NotRNG()), _isInstanceofAssertionOrRNGError);
	});
});
