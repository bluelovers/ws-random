Object.defineProperty(exports, "__esModule", {
    value: !0
});

const distributions_1 = require("../util/distributions"), ow_1 = require("../util/ow");

function itemByWeight(e, t, i, r, l) {
    let n = _createWeight(t, i = i || _getWeight);
    l || (n.vlist = n.vlist.sort(function(e, t) {
        let i;
        return e[0][2] - t[0][2];
    })), r && (n.vlist = e.arrayShuffle(n.vlist, !0));
    let s = 0;
    return n.plist = [], n.klist = n.vlist.reduce(function(e, t) {
        let i = t[0][2];
        return 0 === s ? s = i : s += i, e.push(s), n.plist.push(i), e;
    }, []), () => {
        let t = e.next(), i = n.vlist[n.vlist.length - 1], r;
        for (let e in n.klist) if (t <= n.klist[e]) {
            i = n.vlist[e];
            break;
        }
        return i[i.length > 1 ? distributions_1.randIndex(e, i.length) : 0];
    };
}

function _getWeight(e, t) {
    return e;
}

function _createWeight(e, t = _getWeight) {
    let i = 0, r = 0, l = [], n, s = Object.entries(e).map(function(e) {
        let [r, l] = e, n = t(l, r);
        return n = +n, ow_1.default(n).gt(0), i += n, {
            key: r,
            value: l,
            weight: n,
            percentage: 0
        };
    }).reduce(function(e, t) {
        t.percentage = t.weight / i;
        let r = t.percentage, l = [ t.key, t.value, t.percentage ];
        return 0 === e.last ? e.last = t.percentage : e.last += t.percentage, e.vlist.push([ l ]), 
        e;
    }, {
        vlist: [],
        last: 0
    });
    return {
        sum: i,
        vlist: s.vlist
    };
}

exports.default = itemByWeight, exports._getWeight = _getWeight, exports._createWeight = _createWeight, 
Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJkaXN0cmlidXRpb25zXzEiLCJyZXF1aXJlIiwib3dfMSIsIml0ZW1CeVdlaWdodCIsInJhbmRvbSIsImFyciIsImdldFdlaWdodCIsInNodWZmbGUiLCJkaXNhYmxlU29ydCIsIndzIiwiX2NyZWF0ZVdlaWdodCIsIl9nZXRXZWlnaHQiLCJ2bGlzdCIsInNvcnQiLCJhIiwiYiIsIm4iLCJhcnJheVNodWZmbGUiLCJwc3VtIiwicGxpc3QiLCJrbGlzdCIsInJlZHVjZSIsImxpc3QiLCJwZXJjZW50YWdlIiwicHVzaCIsInIiLCJuZXh0IiwicnMiLCJsZW5ndGgiLCJpIiwiayIsInJhbmRJbmRleCIsImtleSIsInN1bSIsImMiLCJsczIiLCJscyIsImVudHJpZXMiLCJtYXAiLCJlbnRyaWUiLCJ3ZWlnaHQiLCJkZWZhdWx0IiwiZ3QiLCJpdGVtIiwibGFzdCIsImZyZWV6ZSJdLCJtYXBwaW5ncyI6IkFBQUFBLE9BQU9DLGVBQWVDLFNBQVM7SUFBZ0JDLFFBQU87OztBQUN0RCxNQUFNQyxrQkFBa0JDLFFBQVEsMEJBQzFCQyxPQUFPRCxRQUFROztBQUNyQixTQUFTRSxhQUFhQyxHQUFRQyxHQUFLQyxHQUFXQyxHQUFTQztJQUVuRCxJQUFJQyxJQUFLQyxjQUFjTCxHQUR2QkMsSUFBWUEsS0FBYUs7SUFFcEJILE1BQ0RDLEVBQUdHLFFBQVFILEVBQUdHLE1BQU1DLEtBQUssU0FBVUMsR0FBR0M7UUFDbEMsSUFBSUM7UUFDSixPQURRRixFQUFFLEdBQUcsS0FBS0MsRUFBRSxHQUFHO1NBSTNCUixNQUNBRSxFQUFHRyxRQUFRUixFQUFPYSxhQUFhUixFQUFHRyxRQUFPO0lBRTdDLElBQUlNLElBQU87SUFxQlgsT0FwQkFULEVBQUdVLFlBQ0hWLEVBQUdXLFFBQVFYLEVBQUdHLE1BQ1RTLE9BQU8sU0FBVVAsR0FBR1E7UUFDckIsSUFBSUMsSUFBYUQsRUFBSyxHQUFHO1FBU3pCLE9BUmEsTUFBVEosSUFDQUEsSUFBT0ssSUFHUEwsS0FBUUssR0FFWlQsRUFBRVUsS0FBS04sSUFDUFQsRUFBR1UsTUFBTUssS0FBS0QsSUFDUFQ7WUFRSjtRQUNILElBQUlXLElBQUlyQixFQUFPc0IsUUFDWEMsSUFBS2xCLEVBQUdHLE1BQU1ILEVBQUdHLE1BQU1nQixTQUFTLElBT2hDQztRQU5KLEtBQUssSUFBSUMsS0FBS3JCLEVBQUdXLE9BQ2IsSUFBSUssS0FBS2hCLEVBQUdXLE1BQU1VLElBQUk7WUFDbEJILElBQUtsQixFQUFHRyxNQUFNa0I7WUFDZDs7UUFJUixPQUFPSCxFQURDQSxFQUFHQyxTQUFTLElBQUk1QixnQkFBZ0IrQixVQUFVM0IsR0FBUXVCLEVBQUdDLFVBQVU7Ozs7QUFLL0UsU0FBU2pCLFdBQVdaLEdBQU9pQztJQUN2QixPQUFPakM7OztBQUdYLFNBQVNXLGNBQWNMLEdBQUtDLElBQVlLO0lBQ3BDLElBQUlzQixJQUFNLEdBQ05mLElBQU8sR0FDUGdCLFFBQ0FDLEdBZ0JBQyxJQWhCTXhDLE9BQU95QyxRQUFRaEMsR0FDcEJpQyxJQUFJLFNBQVVDO1FBQ2YsS0FBS1AsR0FBS2pDLEtBQVN3QyxHQUNmQyxJQUFTbEMsRUFBVVAsR0FBT2lDO1FBTTlCLE9BSkFRLEtBQVVBLEdBRVZ0QyxLQUFLdUMsUUFBUUQsR0FBUUUsR0FBRyxJQUN4QlQsS0FBT087WUFFSFIsS0FBQUE7WUFDQWpDLE9BQUFBO1lBQ0F5QyxRQUFBQTtZQUNBakIsWUFBWTs7T0FJZkYsT0FBTyxTQUFVUCxHQUFHeUI7UUFDckJBLEVBQU9oQixhQUFhZ0IsRUFBT0MsU0FBU1A7UUFDcEMsSUFBSUgsSUFBSVMsRUFBT2hCLFlBQ1hvQixNQUFRSixFQUFPUCxLQUFLTyxFQUFPeEMsT0FBT3dDLEVBQU9oQjtRQVU3QyxPQVRlLE1BQVhULEVBQUU4QixPQUNGOUIsRUFBRThCLE9BQU9MLEVBQU9oQixhQUdoQlQsRUFBRThCLFFBQVFMLEVBQU9oQixZQUlyQlQsRUFBRUYsTUFBTVksT0FBTW1CO1FBQ1A3Qjs7UUFJUEY7UUFDQWdDLE1BQU07O0lBRVY7UUFFSVgsS0FBQUE7UUFPQXJCLE9BQU93QixFQUFHeEI7Ozs7QUF2RGxCZCxRQUFRMkMsVUFBVXRDLGNBSWxCTCxRQUFRYSxhQUFhQSxZQXNEckJiLFFBQVFZLGdCQUFnQkE7QUFFeEJkLE9BQU9pRCxPQUFPL0MifQ==