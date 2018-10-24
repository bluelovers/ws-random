Object.defineProperty(exports, "__esModule", { value: true });
const distributions_1 = require("../util/distributions");
const ow_lite_1 = require("ow-lite");
function itemByWeight(random, arr, getWeight = _getWeight) {
    let ws = _createWeight(arr, getWeight || _getWeight);
    if (0) {
        console.dir(ws, {
            depth: 5,
            colors: true,
        });
    }
    return () => {
        let r = random.next();
        let rs = ws.vlist[ws.vlist.length - 1];
        for (let k in ws.plist) {
            if (r <= ws.plist[k]) {
                rs = ws.vlist[k];
                break;
            }
        }
        let i = rs.length > 1 ? distributions_1.randIndex(random, rs.length) : 0;
        return rs[i];
    };
}
exports.default = itemByWeight;
function _getWeight(value, key) {
    return value;
}
exports._getWeight = _getWeight;
/**
 * @todo need a better code
 *
 * @private
 */
function _createWeight(arr, getWeight = _getWeight) {
    let sum = 0;
    let c = [];
    let ls = Object.entries(arr)
        .map(function (entrie) {
        let [key, value] = entrie;
        let weight = getWeight(value, key);
        //weight = Math.exp(weight)
        weight = +weight;
        ow_lite_1.default(weight, ow_lite_1.default.number.gt(0));
        sum += weight;
        return {
            key,
            value,
            weight,
            percentage: 0,
        };
    })
        .map(function (entrie) {
        entrie.percentage = entrie.weight / sum;
        return entrie;
    })
        .sort(function (a, b) {
        return a.percentage - b.percentage;
    })
        .reduce(function (a, entrie) {
        let k = entrie.percentage;
        a[k] = a[k] || [];
        let item = [entrie.key, entrie.value];
        a[k].push(item);
        return a;
    }, {});
    let psum = 0;
    let a1 = [];
    let a2 = [];
    Object.keys(ls)
        .reduce(function (a, p) {
        if (psum === 0) {
            psum = +p;
        }
        else {
            psum += +p;
        }
        a1.push(psum);
        a2.push(ls[p]);
        return a;
    }, {});
    return {
        //source: arr,
        sum,
        //sum2,
        //psum,
        //psum2,
        //		list: ls,
        plist: a1,
        vlist: a2,
    };
}
exports._createWeight = _createWeight;
// @ts-ignore
Object.freeze(exports);
