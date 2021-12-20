
export function hashArgv(args: any[]): string
{
	return String(args.join(';'));
}
