/**
 * Created by user on 2018/10/20/020.
 */
/**
 * @todo support typescript
 */
export declare function getClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T;
/**
 * @todo support typescript
 */
export declare function cloneClass<T>(RNGClass: any, thisArgv: any, ...argv: any[]): T;
export declare function hashArgv(args: any[]): string;
/**
 * for non-strict check, try get a little
 */
export declare function array_unique_unsafe<T extends any>(arr: T[]): T[];
