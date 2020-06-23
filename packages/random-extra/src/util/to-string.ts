
export function floatToString(n: number)
{
	let int = Math.floor(n)
	let float = n - int;

	let s = String(float)
		.split('.')[1]
	;

	return String(int) + (s ? '.' + s : '');
}
