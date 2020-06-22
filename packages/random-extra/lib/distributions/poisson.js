Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), logFactorialTable = [ 0, 0, .6931471805599453, 1.791759469228055, 3.1780538303479458, 4.787491742782046, 6.579251212010101, 8.525161361065415, 10.60460290274525, 12.801827480081469 ], logFactorial = t => logFactorialTable[t], logSqrt2PI = .9189385332046727;

exports.default = ((t, e = 1) => {
    if (ow_1.default(e).gt(0), e < 10) {
        const o = Math.exp(-e);
        return () => {
            let r = o, l = 0, a = t.next();
            for (;a > r; ) a -= r, r = e * r / ++l;
            return l;
        };
    }
    {
        const o = Math.sqrt(e), r = .931 + 2.53 * o, l = .02483 * r - .059, a = 1.1239 + 1.1328 / (r - 3.4), n = .9277 - 3.6224 / (r - 2);
        return () => {
            for (;;) {
                let f, i = t.next();
                if (i <= .86 * n) return f = i / n - .43, Math.floor((2 * l / (.5 - Math.abs(f)) + r) * f + e + .445);
                i >= n ? f = t.next() - .5 : (f = ((f = i / n - .93) < 0 ? -.5 : .5) - f, i = t.next() * n);
                const s = .5 - Math.abs(f);
                if (s < .013 && i > s) continue;
                const c = 0 | Math.floor((2 * l / s + r) * f + e + .445);
                if (i = i * a / (l / (s * s) + r), c >= 10) {
                    const t = (c + .5) * Math.log(e / c) - e - logSqrt2PI + c - (1 / 12 - (1 / 360 - 1 / (1260 * c * c)) / (c * c)) / c;
                    if (Math.log(i * o) <= t) return c;
                } else if (c >= 0 && Math.log(i) <= c * Math.log(e) - e - logFactorial(c)) return c;
            }
        };
    }
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImxvZ0ZhY3RvcmlhbFRhYmxlIiwibG9nRmFjdG9yaWFsIiwiayIsImxvZ1NxcnQyUEkiLCJkZWZhdWx0IiwicmFuZG9tIiwibGFtYmRhIiwiZ3QiLCJleHBNZWFuIiwiTWF0aCIsImV4cCIsInAiLCJ4IiwidSIsIm5leHQiLCJzbXUiLCJzcXJ0IiwiYiIsImEiLCJpbnZBbHBoYSIsInZSIiwidiIsImZsb29yIiwiYWJzIiwidXMiLCJ0IiwibG9nIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLE9BQU9DLFFBQVEsZUFDZkMsc0JBQ0YsR0FDQSxHQUNBLG1CQUNBLG1CQUNBLG9CQUNBLG1CQUNBLG1CQUNBLG1CQUNBLG1CQUNBLHNCQUVFQyxlQUFnQkMsS0FDWEYsa0JBQWtCRSxJQUV2QkMsYUFBYTs7QUFDbkJQLFFBQVFRLFVBQVUsRUFBQ0MsR0FBUUMsSUFBUztJQUdoQyxJQURBUixLQUFLTSxRQUFRRSxHQUFRQyxHQUFHLElBQ3BCRCxJQUFTLElBQUk7UUFFYixNQUFNRSxJQUFVQyxLQUFLQyxLQUFLSjtRQUMxQixPQUFPO1lBQ0gsSUFBSUssSUFBSUgsR0FDSkksSUFBSSxHQUNKQyxJQUFJUixFQUFPUztZQUNmLE1BQU9ELElBQUlGLEtBQ1BFLEtBQVFGLEdBQ1JBLElBQUlMLElBQVNLLE1BQU1DO1lBRXZCLE9BQU9BOzs7SUFHVjtRQUVELE1BQU1HLElBQU1OLEtBQUtPLEtBQUtWLElBQ2hCVyxJQUFJLE9BQVEsT0FBT0YsR0FDbkJHLElBQWEsU0FBVUQsSUFBbEIsTUFDTEUsSUFBVyxTQUFTLFVBQVVGLElBQUksTUFDbENHLElBQUssUUFBUyxVQUFVSCxJQUFJO1FBQ2xDLE9BQU87WUFDSCxTQUFhO2dCQUNULElBQUlKLEdBQ0FRLElBQUloQixFQUFPUztnQkFDZixJQUFJTyxLQUFLLE1BQU9ELEdBRVosT0FEQVAsSUFBSVEsSUFBSUQsSUFBSyxLQUNOWCxLQUFLYSxPQUFPLElBQUlKLEtBQUssS0FBTVQsS0FBS2MsSUFBSVYsTUFBTUksS0FBS0osSUFBSVAsSUFBUztnQkFFbkVlLEtBQUtELElBQ0xQLElBQUlSLEVBQU9TLFNBQVMsTUFJcEJELE1BREFBLElBQUlRLElBQUlELElBQUssT0FDSCxLQUFNLEtBQU0sTUFBT1AsR0FDN0JRLElBQUloQixFQUFPUyxTQUFTTTtnQkFFeEIsTUFBTUksSUFBSyxLQUFNZixLQUFLYyxJQUFJVjtnQkFDMUIsSUFBSVcsSUFBSyxRQUFTSCxJQUFJRyxHQUNsQjtnQkFFSixNQUFNdEIsSUFBd0QsSUFBcERPLEtBQUthLE9BQU8sSUFBSUosSUFBSU0sSUFBS1AsS0FBS0osSUFBSVAsSUFBUztnQkFFckQsSUFEQWUsSUFBSUEsSUFBSUYsS0FBWUQsS0FBS00sSUFBS0EsS0FBTVAsSUFDaENmLEtBQUssSUFBSTtvQkFDVCxNQUFNdUIsS0FBS3ZCLElBQUksTUFBT08sS0FBS2lCLElBQUlwQixJQUFTSixLQUFLSSxJQUFTSCxhQUNsREQsS0FBSyxJQUFJLE1BQVEsSUFBSSxNQUFRLEtBQUssT0FBU0EsSUFBSUEsT0FBT0EsSUFBSUEsTUFBTUE7b0JBQ3BFLElBQUlPLEtBQUtpQixJQUFJTCxJQUFJTixNQUFRVSxHQUNyQixPQUFPdkI7dUJBR1YsSUFBSUEsS0FBSyxLQUNOTyxLQUFLaUIsSUFBSUwsTUFBTW5CLElBQUlPLEtBQUtpQixJQUFJcEIsS0FBVUEsSUFBU0wsYUFBYUMsSUFDNUQsT0FBT0E7Ozs7SUFRL0JSLE9BQU9pQyxPQUFPL0IifQ==