Object.defineProperty(exports, "__esModule", {
    value: !0
});

const byte_1 = require("../util/byte"), const_1 = require("../util/const"), bytes_1 = require("./bytes");

function default_1(e, t) {
    let _ = bytes_1.default(e, 16), r = t ? byte_1._bytesToUuid(const_1.BYTE_TO_HEX_TO_UPPER_CASE) : byte_1._bytesToUuid(const_1.BYTE_TO_HEX_TO_LOWER_CASE);
    return () => {
        let e = _(), t;
        return e[6] = 15 & e[6] | 64, e[8] = 63 & e[8] | 128, r(e);
    };
}

exports.default = default_1, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJieXRlXzEiLCJyZXF1aXJlIiwiY29uc3RfMSIsImJ5dGVzXzEiLCJkZWZhdWx0XzEiLCJyYW5kb20iLCJ0b1VwcGVyQ2FzZSIsImZuIiwiZGVmYXVsdCIsImZuMiIsIl9ieXRlc1RvVXVpZCIsIkJZVEVfVE9fSEVYX1RPX1VQUEVSX0NBU0UiLCJCWVRFX1RPX0hFWF9UT19MT1dFUl9DQVNFIiwiYXJyIiwiaWQiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsU0FBU0MsUUFBUSxpQkFDakJDLFVBQVVELFFBQVEsa0JBQ2xCRSxVQUFVRixRQUFROztBQUl4QixTQUFTRyxVQUFVQyxHQUFRQztJQUN2QixJQUFJQyxJQUFLSixRQUFRSyxRQUFRSCxHQUFRLEtBQzdCSSxJQUFNSCxJQUFjTixPQUFPVSxhQUFhUixRQUFRUyw2QkFBNkJYLE9BQU9VLGFBQWFSLFFBQVFVO0lBQzdHLE9BQU87UUFDSCxJQUFJQyxJQUFNTixLQUdOTztRQUNKLE9BSEFELEVBQUksS0FBZSxLQUFUQSxFQUFJLEtBQWEsSUFDM0JBLEVBQUksS0FBZSxLQUFUQSxFQUFJLEtBQWEsS0FDbEJKLEVBQUlJOzs7O0FBSXJCZixRQUFRVSxVQUFVSixXQUVsQlIsT0FBT21CLE9BQU9qQiJ9