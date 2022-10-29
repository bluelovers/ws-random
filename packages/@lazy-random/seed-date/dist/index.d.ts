export type IFnRandomFloat = () => number;
export declare function seedFloatByDate(date: Date, fnRandomFloat: IFnRandomFloat): number;
export declare function seedFloatByNow(fnRandomFloat?: IFnRandomFloat): number;
export declare function seedStringByDate(date: Date, fnRandomFloat?: IFnRandomFloat): string;
export declare function seedStringByNow(fnRandomFloat?: IFnRandomFloat): string;

export {};
