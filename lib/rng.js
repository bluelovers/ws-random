Object.defineProperty(exports, "__esModule", {
    value: !0
});

const default_1 = require("./seeder/default"), hash_any_1 = require("./seeder/hash-any"), util_1 = require("./util");

class RNG {
    constructor(e, r, ...t) {}
    _init(e, r, ...t) {}
    static create(e, r, ...t) {
        if (this === RNG || !this) throw new ReferenceError("RNG is abstract class");
        return new this(e, r, ...t);
    }
    get name() {
        throw new Error("RNG.name must be overridden");
    }
    get options() {
        return null;
    }
    get seedable() {
        return null;
    }
    next() {
        throw new ReferenceError("RNG.next must be overridden");
    }
    seed(e, r, ...t) {}
    clone(e, r, ...t) {
        throw new ReferenceError("RNG.clone must be overridden");
    }
    _seedAuto(e, r, ...t) {
        return e && "number" == typeof e ? this._seedNum(e, r, ...t) : this._seedStr(e, r, ...t);
    }
    _seedNum(e, r, ...t) {
        return void 0 !== e && null !== e && 0 !== e || (e = util_1.randomSeedStr()), default_1.seedToken(e, r, ...t);
    }
    _seedStr(e, r, ...t) {
        return hash_any_1.hashAny(e, r, ...t);
    }
}

exports.RNG = RNG, exports.default = RNG, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkZWZhdWx0XzEiLCJyZXF1aXJlIiwiaGFzaF9hbnlfMSIsInV0aWxfMSIsIlJORyIsIltvYmplY3QgT2JqZWN0XSIsInNlZWQiLCJvcHRzIiwiYXJndiIsInRoaXMiLCJSZWZlcmVuY2VFcnJvciIsIm5hbWUiLCJFcnJvciIsIm9wdGlvbnMiLCJzZWVkYWJsZSIsIl9zZWVkTnVtIiwiX3NlZWRTdHIiLCJyYW5kb21TZWVkU3RyIiwic2VlZFRva2VuIiwiaGFzaEFueSIsImRlZmF1bHQiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsWUFBWUMsUUFBUSxxQkFDcEJDLGFBQWFELFFBQVEsc0JBQ3JCRSxTQUFTRixRQUFROztNQUNqQkc7SUFDRkMsWUFBWUMsR0FBTUMsTUFBU0M7SUFFM0JILE1BQU1DLEdBQU1DLE1BQVNDO0lBRXJCSCxjQUFjQyxHQUFNQyxNQUFTQztRQUN6QixJQUFJQyxTQUFTTCxRQUFRSyxNQUNqQixNQUFNLElBQUlDLGVBQWU7UUFHN0IsT0FBTyxJQUFJRCxLQUFLSCxHQUFNQyxNQUFTQzs7SUFFbkNHO1FBQ0ksTUFBTSxJQUFJQyxNQUFNOztJQUVwQkM7UUFDSSxPQUFPOztJQUVYQztRQUNJLE9BQU87O0lBTVhUO1FBQ0ksTUFBTSxJQUFJSyxlQUFlOztJQUU3QkwsS0FBS0MsR0FBTUMsTUFBU0M7SUFHcEJILE1BQU1DLEdBQU1DLE1BQVNDO1FBQ2pCLE1BQU0sSUFBSUUsZUFBZTs7SUFFN0JMLFVBQVVDLEdBQU1DLE1BQVNDO1FBQ3JCLE9BQUlGLEtBQXdCLG1CQUFUQSxJQUNSRyxLQUFLTSxTQUFTVCxHQUFNQyxNQUFTQyxLQUVqQ0MsS0FBS08sU0FBU1YsR0FBTUMsTUFBU0M7O0lBS3hDSCxTQUFTQyxHQUFNQyxNQUFTQztRQVVwQixZQVJvQixNQUFURixLQUFpQyxTQUFUQSxLQUEwQixNQUFUQSxNQU1oREEsSUFBT0gsT0FBT2Msa0JBRVhqQixVQUFVa0IsVUFBVVosR0FBTUMsTUFBU0M7O0lBSzlDSCxTQUFTQyxHQUFNQyxNQUFTQztRQUNwQixPQUFPTixXQUFXaUIsUUFBUWIsR0FBTUMsTUFBU0M7Ozs7QUFHakRWLFFBQVFNLE1BQU1BLEtBQ2ROLFFBQVFzQixVQUFVaEIsS0FFbEJSLE9BQU95QixPQUFPdkIifQ==