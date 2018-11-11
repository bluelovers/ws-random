import seedrandom = require('seedrandom');
export declare function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T;
export declare function tryRequire<T extends unknown = any>(name: string): T;
