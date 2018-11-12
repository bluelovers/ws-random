import test from 'ava'
import random from '../..'

test('core-decorators<@autobind> : next', (t) =>
{
	let fn = random.next;

	t.true(fn === random.next)
	t.true(typeof fn() === 'number')

})

test('core-decorators<@autobind> : seed', (t) =>
{
	let fn = random.seed;

	t.true(fn === random.seed)
	t.true(fn() === random)

})

test('core-decorators<@autobind> : random', (t) =>
{
	let fn = random.random;

	t.true(fn === random.random)
	t.true(typeof fn() === 'number')

})

