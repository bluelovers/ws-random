/**
 * Created by user on 2018/10/22/022.
 */
export declare const defaultArgv: Readonly<{
    int: ReadonlyArray<number>;
    integer: ReadonlyArray<number>;
    boolean: ReadonlyArray<number>;
    bytes: ReadonlyArray<number>;
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
