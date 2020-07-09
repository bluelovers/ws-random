#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importDefault(require(".."));
if (process.argv.length < 4) {
    console.log('Usage:');
    console.log('  anybase target_numberic_base original_number [original_numeric_base [digits_min [digits_max]]]');
}
else {
    try {
        // @ts-ignore
        console.log(__1.default.apply(this, process.argv.slice(2)));
    }
    catch (error) {
        error;
        console.error(String(error));
        process.exit(1);
    }
}
//# sourceMappingURL=anybase.js.map