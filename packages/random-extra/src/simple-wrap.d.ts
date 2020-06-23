/**
 * Created by user on 2018/10/22/022.
 */
export declare const defaultArgv: Readonly<{
    int: readonly number[];
    integer: readonly number[];
    boolean: readonly number[];
    bytes: readonly number[];
}>;
export declare function simpleWrap<T extends (() => number)>(fn: T): {
    next(): number;
    random(): number;
    float(min?: number, max?: number): number;
    int(min?: number, max?: number): number;
    readonly integer: (min?: number, max?: number) => number;
    boolean(likelihood?: number): boolean;
    byte(): number;
    bytes(size?: number): number[];
    seed(...argv: any[]): any;
};
export default simpleWrap;
