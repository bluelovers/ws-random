"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._itemByWeightCore = exports._percentageWeight = exports._sortWeight = exports._createWeight = exports._getWeight = void 0;
const ow_1 = __importDefault(require("../../util/ow"));
function _getWeight(value, key) {
    return value + 1;
}
exports._getWeight = _getWeight;
function _createWeight(arr, options) {
    var _a;
    let sum = 0;
    const getWeight = (_a = options === null || options === void 0 ? void 0 : options.getWeight) !== null && _a !== void 0 ? _a : _getWeight;
    let ls2 = Object.entries(arr)
        .map(function (entrie) {
        let [key, value] = entrie;
        let weight = getWeight(value, key);
        //weight = Math.exp(weight)
        weight = +weight;
        //ow(weight, ow.number.gt(0))
        ow_1.default(weight).gt(0);
        sum += weight;
        return {
            key,
            value,
            weight,
            percentage: 0,
        };
    });
    let ls = ls2
        .reduce(function (a, entrie) {
        entrie.percentage = entrie.weight / sum;
        //let k = entrie.percentage
        let item = [entrie.key, entrie.value, entrie.percentage];
        if (a.last === 0) {
            a.last = entrie.percentage;
        }
        else {
            a.last += entrie.percentage;
        }
        //a.klist.push(a.last)
        //a.plist.push(entrie.percentage)
        a.vlist.push(item);
        return a;
    }, {
        //klist: [],
        //plist: [],
        vlist: [],
        last: 0,
    });
    ow_1.default(ls.vlist).have.length.gt(1);
    return {
        //source: arr,
        sum,
        //sum2,
        //psum,
        //psum2,
        //		list: ls,
        //klist: ls.klist,
        //plist: ls.plist,
        vlist: ls.vlist,
    };
}
exports._createWeight = _createWeight;
function _sortWeight(random, ws, options = {}) {
    if (!options.disableSort) {
        ws.vlist = ws.vlist.sort(function (a, b) {
            let n = a[2] - b[2];
            return n;
        });
    }
    if (options.shuffle) {
        ws.vlist = random.arrayShuffle(ws.vlist, true);
    }
    return ws;
}
exports._sortWeight = _sortWeight;
function _percentageWeight(random, ws) {
    let psum = 0;
    ws.plist = [];
    ws.klist = ws.vlist
        .reduce(function (a, list) {
        let percentage = list[2];
        if (psum === 0) {
            psum = percentage;
        }
        else {
            psum += percentage;
        }
        a.push(psum);
        ws.plist.push(percentage);
        return a;
    }, []);
    return ws;
}
exports._percentageWeight = _percentageWeight;
function _itemByWeightCore(r, klist) {
    let index;
    for (let k = 0; k < klist.length; k++) {
        if (r <= klist[k]) {
            index = k;
            break;
        }
    }
    return index !== null && index !== void 0 ? index : klist.length - 1;
}
exports._itemByWeightCore = _itemByWeightCore;
//# sourceMappingURL=item-by-weight.js.map