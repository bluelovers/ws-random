/// <reference types="node" />
import seedrandom from 'seedrandom';
import crypto from 'crypto';
export declare function tryRequire<T = typeof crypto>(name: 'crypto'): T;
export declare function tryRequire<T = typeof seedrandom>(name: 'seedrandom'): T;
export declare function tryRequire<T extends unknown = any>(name: string): T;
