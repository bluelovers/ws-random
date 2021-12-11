/**
 * Created by user on 2018/10/20/020.
 */
//import shortid = require('shortid');
//
//export declare function shortid(): string
//export declare function hashSum(input): string
//
//export { shortid, hashSum }


export function hashArgv(args: any[]): string
{
	return String(args.join(';'));
}

/**
 * for non-strict check, try get a little
 */
export function array_unique_unsafe<T extends any>(arr: T[])
{
	return arr.filter((v, i, arr) => arr.indexOf(v) === i)
}


