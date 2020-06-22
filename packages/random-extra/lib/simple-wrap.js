function simpleWrap(e) {
    let t = {
        next: () => e(),
        random: () => e(),
        float: (t = 0, r = 1) => e() * (r - t + 1) + t,
        int: (t = 0, r = 100) => Math.floor(e() * (r - t + 1) + t),
        get integer() {
            return t.int;
        },
        boolean: (t = .5) => e() >= t,
        byte: () => t.int(0, 255),
        bytes(e = 1) {
            let r = [];
            for (let o = 0; o < e; o++) r.push(t.byte());
            return r;
        },
        seed: (...e) => t
    };
    return t;
}

Object.defineProperty(exports, "__esModule", {
    value: !0
}), exports.defaultArgv = Object.freeze({
    int: Object.freeze([ 0, 100 ]),
    integer: Object.freeze([ 0, 100 ]),
    boolean: Object.freeze([ .5 ]),
    bytes: Object.freeze([ 1 ])
}), exports.simpleWrap = simpleWrap, exports.default = simpleWrap, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsic2ltcGxlV3JhcCIsImZuIiwic2VsZiIsIm5leHQiLCJyYW5kb20iLCJmbG9hdCIsIm1pbiIsIm1heCIsImludCIsIk1hdGgiLCJmbG9vciIsImludGVnZXIiLCJib29sZWFuIiwibGlrZWxpaG9vZCIsImJ5dGUiLCJbb2JqZWN0IE9iamVjdF0iLCJzaXplIiwiYXJyIiwiaSIsInB1c2giLCJzZWVkIiwiYXJndiIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwiZGVmYXVsdEFyZ3YiLCJmcmVlemUiLCJieXRlcyIsImRlZmF1bHQiXSwibWFwcGluZ3MiOiJBQVVBLFNBQVNBLFdBQVdDO0lBQ2hCLElBQUlDO1FBQ0FDLE1BQUksTUFDT0Y7UUFFWEcsUUFBTSxNQUNLSDtRQUVYSSxPQUFLLENBQUNDLElBQU0sR0FBR0MsSUFBTSxNQUNUTixPQUFRTSxJQUFNRCxJQUFNLEtBQUtBO1FBRXJDRSxLQUFHLENBQUNGLElBQU0sR0FBR0MsSUFBTSxRQUNSRSxLQUFLQyxNQUFNVCxPQUFRTSxJQUFNRCxJQUFNLEtBQUtBO1FBRS9DSztZQUNJLE9BQU9ULEVBQUtNOztRQUVoQkksU0FBTyxDQUFDQyxJQUFhLE9BQ1RaLE9BQVFZO1FBRXBCQyxNQUFJLE1BQ09aLEVBQUtNLElBQUksR0FBRztRQUV2Qk8sTUFBTUMsSUFBTztZQUNULElBQUlDO1lBQ0osS0FBSyxJQUFJQyxJQUFJLEdBQUdBLElBQUlGLEdBQU1FLEtBQ3RCRCxFQUFJRSxLQUFLakIsRUFBS1k7WUFFbEIsT0FBT0c7O1FBRVhHLE1BQUksSUFBSUMsTUFDR25COztJQUdmLE9BQU9BOzs7QUF6Q1hvQixPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPO0lBQ3RERCxRQUFRRSxjQUFjSixPQUFPSztJQUN6Qm5CLEtBQUtjLE9BQU9LLFNBQVEsR0FBRztJQUN2QmhCLFNBQVNXLE9BQU9LLFNBQVEsR0FBRztJQUMzQmYsU0FBU1UsT0FBT0ssU0FBUTtJQUN4QkMsT0FBT04sT0FBT0ssU0FBUTtJQXNDMUJILFFBQVF4QixhQUFhQSxZQUNyQndCLFFBQVFLLFVBQVU3QixZQUVsQnNCLE9BQU9LLE9BQU9IIn0=