function randomBytes(r, t) {
    return exports.crossCrypto().randomBytes(r, t);
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.crossCrypto = (() => {
    let r;
    return () => {
        if (void 0 === r) {
            let t;
            try {
                t = r = require("crypto");
            } catch (e) {
                (t = global.crypto || global.msCrypto) && t.getRandomValues && (r = t);
            }
            r && !r.randomBytes && (r.randomBytes = r.randomBytes || function randomBytes(r, e) {
                if (r > 65536) throw new Error("requested too many random bytes");
                let o = new Uint8Array(r);
                r > 0 && t.getRandomValues(o);
                let n = Buffer.from(o.buffer);
                return "function" == typeof e && e(null, n), n;
            });
        }
        if (!r) throw r = null, new Error("not support crypto");
        return r;
    };
})(), exports.randomBytes = randomBytes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsicmFuZG9tQnl0ZXMiLCJzaXplIiwiY2FsbGJhY2siLCJleHBvcnRzIiwiY3Jvc3NDcnlwdG8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiY3J5cHRvIiwiX2NyeXB0byIsInJlcXVpcmUiLCJlIiwiZ2xvYmFsIiwibXNDcnlwdG8iLCJnZXRSYW5kb21WYWx1ZXMiLCJjYiIsIkVycm9yIiwicmF3Qnl0ZXMiLCJVaW50OEFycmF5IiwiYnl0ZXMiLCJCdWZmZXIiLCJmcm9tIiwiYnVmZmVyIl0sIm1hcHBpbmdzIjoiQUEyQ0EsU0FBU0EsWUFBWUMsR0FBTUM7SUFDdkIsT0FBT0MsUUFBUUMsY0FBY0osWUFBWUMsR0FBTUM7OztBQXpDbkRHLE9BQU9DLGVBQWVILFNBQVM7SUFBZ0JJLFFBQU87SUFDdERKLFFBQVFDLGNBQWM7SUFDbEIsSUFBSUk7SUFDSixPQUFPO1FBQ0gsU0FBc0IsTUFBWEEsR0FBd0I7WUFDL0IsSUFBSUM7WUFDSjtnQkFDSUEsSUFBVUQsSUFBU0UsUUFBUTtjQUUvQixPQUFPQztpQkFFSEYsSUFBVUcsT0FBT0osVUFBVUksT0FBT0MsYUFDbkJKLEVBQVFLLG9CQUNuQk4sSUFBU0M7O1lBR2JELE1BQVdBLEVBQU9SLGdCQUNsQlEsRUFBT1IsY0FBY1EsRUFBT1IsZUFBZSxTQUFTQSxZQUFZQyxHQUFNYztnQkFDbEUsSUFBSWQsSUFBTyxPQUNQLE1BQU0sSUFBSWUsTUFBTTtnQkFDcEIsSUFBSUMsSUFBVyxJQUFJQyxXQUFXakI7Z0JBQzFCQSxJQUFPLEtBQ1BRLEVBQVFLLGdCQUFnQkc7Z0JBRzVCLElBQUlFLElBQVFDLE9BQU9DLEtBQUtKLEVBQVNLO2dCQUlqQyxPQUhrQixxQkFBUFAsS0FDUEEsRUFBRyxNQUFNSSxJQUVOQTs7O1FBSW5CLEtBQUtYLEdBRUQsTUFEQUEsSUFBUyxNQUNILElBQUlRLE1BQU07UUFFcEIsT0FBT1I7O0VBcENPLElBMEN0QkwsUUFBUUgsY0FBY0EifQ==