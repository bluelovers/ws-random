/// <reference types="node" />
import seedrandom = require('seedrandom');
import crypto = require('crypto');
export declare function tryRequire<T = typeof crypto>(name: 'crypto'): T;
export declare function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T;
export declare function tryRequire<T extends unknown = any>(name: string): T;
