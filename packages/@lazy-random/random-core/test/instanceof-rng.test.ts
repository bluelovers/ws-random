/**
 * Node.js 原生測試 / Node.js Native Test Runner (node:test)
 *
 * 測試「直接或間接包含 `expect(rng).instanceof(RNG)`」的 API 是否有確實執行該檢查
 * Test APIs that run `expect(rng).instanceof(RNG)` directly or indirectly
 *
 * - `use()`         → 直接呼叫該檢查 / calls the check directly
 * - `_init()`       → 自身的檢查 + 間接呼叫 `use()` / own check + indirect via `use()`
 * - `constructor()` → 間接呼叫 `_init()` → `use()` / indirect via `_init()` → `use()`
 */

import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { RNG } from '@lazy-random/rng-abstract';
import { RandomCore } from '../src/index';

/**
 * 可通過 `expect(rng).instanceof(RNG)` 的具體實作
 * A concrete RNG that passes `expect(rng).instanceof(RNG)`
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
 * `expect(rng).instanceof(RNG)` 失敗時所拋出的 chai AssertionError
 * The chai AssertionError thrown when `expect(rng).instanceof(RNG)` fails
 */
function isInstanceofAssertionError(err: unknown): boolean
{
	return err instanceof Error
		&& err.name === 'AssertionError'
		&& /instance/i.test(err.message)
}

/**
 * 不該通過 instanceof 檢查的輸入
 * Inputs that must not pass the instanceof check
 *
 * 鴨子型別的假物件用來確認這是真的 `instanceof` 檢查、而非結構檢查
 * The duck-typed fake proves it is a real `instanceof` check, not a structural one
 */
const invalidRngList: [label: string, value: unknown][] = [
	['undefined', undefined],
	['null', null],
	['number', 42],
	['string', 'rng'],
	['Math.random', Math.random],
	['plain object', { next: () => 0.5 }],
	['duck-typed fake RNG', { next: () => 0.5, seed() {}, name: 'fake-rng', seedable: true }],
];

const callInit = (random: RandomCore, rng?: unknown) =>
{
	// _init 為 protected，測試以 any 呼叫 / call protected `_init` from the test
	return (random as any)._init(rng)
}

describe(`RandomCore`, () =>
{
	const newCore = () => new RandomCore(new TestRNG());

	describe(`constructor() 間接執行 expect(rng).instanceof(RNG)`, () =>
	{
		test(`合法 RNG 實例可正常建立並掛載`, () =>
		{
			// @ts-ignore
			const rng = new TestRNG();
			const random = new RandomCore(rng);

			assert.strictEqual(random.rng, rng);
			assert.strictEqual(typeof random.next(), 'number');
		});

		invalidRngList.forEach(([label, value]) =>
		{
			test(`傳入 ${label} 應觸發 instanceof 檢查並拋錯`, () =>
			{
				assert.throws(() => new RandomCore(value as any), isInstanceofAssertionError);
			});
		});
	});

	describe(`use() 直接執行 expect(rng).instanceof(RNG)`, () =>
	{
		test(`合法 RNG 會通過檢查、回傳 this 並替換 .rng`, () =>
		{
			const random = newCore();
			// @ts-ignore
			const rng2 = new TestRNG();

			const ret = random.use(rng2);

			assert.strictEqual(ret, random);
			assert.strictEqual(random.rng, rng2);
			assert.strictEqual(typeof random.next(), 'number');
		});

		test(`檢查失敗時應拋錯且不得改動既有的 .rng`, () =>
		{
			const random = newCore();
			const before = random.rng;

			invalidRngList.forEach(([label, value]) =>
			{
				assert.throws(() => random.use(value as any), isInstanceofAssertionError, `use(${label})`);
			});

			assert.strictEqual(random.rng, before);
		});
	});

	describe(`_init() 間接執行 expect(rng).instanceof(RNG)`, () =>
	{
		test(`合法 RNG 會透過 use() 掛載`, () =>
		{
			const random = newCore();
			// @ts-ignore
			const rng2 = new TestRNG();

			callInit(random, rng2);

			assert.strictEqual(random.rng, rng2);
		});

		test(`檢查失敗時應拋錯且不得改動既有的 .rng`, () =>
		{
			const random = newCore();
			const before = random.rng;

			invalidRngList.forEach(([label, value]) =>
			{
				assert.throws(() => callInit(random, value), isInstanceofAssertionError, `_init(${label})`);
			});

			assert.strictEqual(random.rng, before);
		});
	});

});
