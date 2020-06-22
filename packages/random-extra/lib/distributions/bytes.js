Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), byte_1 = require("./byte");

function uniformBytes(e, t, r) {
    ow_1.default(t).integer.gt(0);
    const o = byte_1.default(e, r);
    return () => {
        let e = t, r = [];
        for (;e--; ) r[e] = o();
        return r;
    };
}

exports.default = uniformBytes, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImJ5dGVfMSIsInVuaWZvcm1CeXRlcyIsInJhbmRvbSIsInNpemUiLCJ0b1N0ciIsImRlZmF1bHQiLCJpbnRlZ2VyIiwiZ3QiLCJmbiIsImkiLCJhcnIiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsT0FBT0MsUUFBUSxlQUNmQyxTQUFTRCxRQUFROztBQUN2QixTQUFTRSxhQUFhQyxHQUFRQyxHQUFNQztJQUNoQ04sS0FBS08sUUFBUUYsR0FBTUcsUUFBUUMsR0FBRztJQUM5QixNQUFNQyxJQUFLUixPQUFPSyxRQUFRSCxHQUFRRTtJQUNsQyxPQUFPO1FBQ0gsSUFBSUssSUFBSU4sR0FDSk87UUFDSixNQUFPRCxPQUNIQyxFQUFJRCxLQUFLRDtRQUViLE9BQU9FOzs7O0FBR2ZkLFFBQVFTLFVBQVVKLGNBRWxCUCxPQUFPaUIsT0FBT2YifQ==