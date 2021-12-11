
/**
 * back to original interval
 */
export function array_rebase(ret_b: number[], n_diff: number, min: number, max: number)
{
	let b_sum = 0;

	let bool: boolean;

	let i = ret_b.length;

	if (typeof min === 'number' || typeof max === 'number')
	{
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			if (n >= min && n <= max)
			{
				bool = true;
				ret_b[i] = n;

				b_sum += n
			}
			else
			{
				bool = false;
				break;
			}
		}
	}
	else
	{
		while (i--)
		{
			let v = ret_b[i];
			let n = v + n_diff;

			ret_b[i] = n;

			b_sum += n
		}

		bool = true;
	}

	return {
		bool,
		b_sum,
	};
}
