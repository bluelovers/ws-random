Object.defineProperty(exports, "__esModule", {
    value: !0
});

const UString = require("uni-string"), util_1 = require("../util"), const_1 = require("../util/const"), distributions_1 = require("../util/distributions"), ow_1 = require("../util/ow");

exports.default = ((t, e, r) => {
    "number" == typeof e && ("number" == typeof r ? e = util_1.floatToString(e) : [r, e] = [ e, null ]), 
    r = r || 8, ow_1.default(r).integer.gt(0), e || (e = const_1.ENUM_ALPHABET.DEFAULT);
    let i = UString.create(e).split(""), u = i.length;
    ow_1.default(i).to.have.lengthOf.gt(1);
    const n = () => distributions_1.randIndex(t, u);
    return () => {
        let t = r, e = [];
        for (;t--; ) e.push(i[n()]);
        return e.join("");
    };
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJVU3RyaW5nIiwicmVxdWlyZSIsInV0aWxfMSIsImNvbnN0XzEiLCJkaXN0cmlidXRpb25zXzEiLCJvd18xIiwiZGVmYXVsdCIsInJhbmRvbSIsImNoYXIiLCJzaXplIiwiZmxvYXRUb1N0cmluZyIsImludGVnZXIiLCJndCIsIkVOVU1fQUxQSEFCRVQiLCJERUZBVUxUIiwibHMiLCJjcmVhdGUiLCJzcGxpdCIsImxlbiIsImxlbmd0aCIsInRvIiwiaGF2ZSIsImxlbmd0aE9mIiwicmFuZEluZGV4IiwiaSIsImxpc3QiLCJwdXNoIiwiam9pbiIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBR0FBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxVQUFVQyxRQUFRLGVBQ2xCQyxTQUFTRCxRQUFRLFlBQ2pCRSxVQUFVRixRQUFRLGtCQUNsQkcsa0JBQWtCSCxRQUFRLDBCQUMxQkksT0FBT0osUUFBUTs7QUFDckJILFFBQVFRLFVBQVUsRUFBQ0MsR0FBUUMsR0FBTUM7SUFDVCxtQkFBVEQsTUFDYSxtQkFBVEMsSUFDUEQsSUFBT04sT0FBT1EsY0FBY0YsTUFHM0JDLEdBQU1ELE9BQVNBLEdBQU07SUFHOUJDLElBQU9BLEtBQVEsR0FFZkosS0FBS0MsUUFBUUcsR0FBTUUsUUFBUUMsR0FBRyxJQUN6QkosTUFDREEsSUFBT0wsUUFBUVUsY0FBY0M7SUFFakMsSUFBSUMsSUFBS2YsUUFBUWdCLE9BQU9SLEdBQU1TLE1BQU0sS0FDaENDLElBQU1ILEVBQUdJO0lBQ2JkLEtBQUtDLFFBQVFTLEdBQUlLLEdBQUdDLEtBQUtDLFNBQVNWLEdBQUc7SUFDckMsTUFBTVcsSUFBWSxNQUNQbkIsZ0JBQWdCbUIsVUFBVWhCLEdBQVFXO0lBRTdDLE9BQU87UUFDSCxJQUFJTSxJQUFJZixHQUNKZ0I7UUFDSixNQUFPRCxPQUNIQyxFQUFLQyxLQUFLWCxFQUFHUTtRQUVqQixPQUFPRSxFQUFLRSxLQUFLOztJQUl6Qi9CLE9BQU9nQyxPQUFPOUIifQ==