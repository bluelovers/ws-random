Object.defineProperty(exports, "__esModule", {
    value: !0
});

const uniform_int_1 = require("./uniform-int"), util_1 = require("../util"), ow_1 = require("../util/ow"), byte_1 = require("./byte"), uniform_1 = require("./uniform");

function arrayFill(e, t, r, i) {
    let u;
    {
        let l = util_1.isUnset(t), n = util_1.isUnset(r);
        u = n && l ? byte_1.default(e) : i ? uniform_1.default(e, t, r) : uniform_int_1.default(e, t, r), 
        t = void 0, r = void 0;
    }
    return ow_1.default(u).is.function(), e => {
        let t = e.length;
        for (;t--; ) e[t] = u();
        return e;
    };
}

exports.default = arrayFill, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJ1bmlmb3JtX2ludF8xIiwicmVxdWlyZSIsInV0aWxfMSIsIm93XzEiLCJieXRlXzEiLCJ1bmlmb3JtXzEiLCJhcnJheUZpbGwiLCJyYW5kb20iLCJtaW4iLCJtYXgiLCJmbG9hdCIsImZuIiwibWluX3Vuc2V0IiwiaXNVbnNldCIsIm1heF91bnNldCIsImRlZmF1bHQiLCJpcyIsImZ1bmN0aW9uIiwiYXJyIiwiaSIsImxlbmd0aCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxnQkFBZ0JDLFFBQVEsa0JBQ3hCQyxTQUFTRCxRQUFRLFlBQ2pCRSxPQUFPRixRQUFRLGVBQ2ZHLFNBQVNILFFBQVEsV0FDakJJLFlBQVlKLFFBQVE7O0FBQzFCLFNBQVNLLFVBQVVDLEdBQVFDLEdBQUtDLEdBQUtDO0lBQ2pDLElBQUlDO0lBQ0o7UUFDSSxJQUFJQyxJQUFZVixPQUFPVyxRQUFRTCxJQUMzQk0sSUFBWVosT0FBT1csUUFBUUo7UUFFM0JFLElBREFHLEtBQWFGLElBQ1JSLE9BQU9XLFFBQVFSLEtBRWZHLElBQ0FMLFVBQVVVLFFBQVFSLEdBQVFDLEdBQUtDLEtBRy9CVCxjQUFjZSxRQUFRUixHQUFRQyxHQUFLQztRQUU1Q0QsU0FBTSxHQUNOQyxTQUFNOztJQUdWLE9BREFOLEtBQUtZLFFBQVFKLEdBQUlLLEdBQUdDLFlBQ1pDO1FBQ0osSUFBSUMsSUFBSUQsRUFBSUU7UUFDWixNQUFPRCxPQUNIRCxFQUFJQyxLQUFLUjtRQUViLE9BQU9POzs7O0FBR2ZwQixRQUFRaUIsVUFBVVQsV0FFbEJWLE9BQU95QixPQUFPdkIifQ==