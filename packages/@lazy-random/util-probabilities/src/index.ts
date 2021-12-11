/**
 * Created by user on 2021/12/11.
 */

/**
 * simple probabilities
 */
export function get_prob(size: number, sum: number)
{
	let score = sum;
	let resultArray: number[] = [];
	let randomTotal = 0;
	let i: number = size - 1;

	while (i--)
	{
		let random = Math.round(score / size);

		resultArray.push(random);
		randomTotal += random;

		score = score - random;
	}

	let result = sum - randomTotal;
	resultArray.unshift(result);

	return resultArray;
}

export function get_prob_float(size: number, sum: number)
{
	let score = sum;
	let resultArray: number[] = [];
	let randomTotal = 0;
	let i: number = size - 1;

	while (i--)
	{
		let random = score / size;

		resultArray.push(random);
		randomTotal += random;

		score = score - random;
	}

	let result = sum - randomTotal;
	resultArray.unshift(result);

	return resultArray;
}
