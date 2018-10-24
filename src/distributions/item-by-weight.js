Object.defineProperty(exports, "__esModule", { value: true });
const distributions_1 = require("../util/distributions");
const ow_lite_1 = require("ow-lite");
function itemByWeight(random, arr, getWeight, shuffle, disableSort) {
    getWeight = getWeight || _getWeight;
    let ws = _createWeight(arr, getWeight);
    if (!disableSort) {
        ws.vlist = ws.vlist.sort(function (a, b) {
            let n = a[0][2] - b[0][2];
            return n;
        });
    }
    if (shuffle) {
        ws.vlist = random.arrayShuffle(ws.vlist, true);
    }
    let psum = 0;
    ws.plist = [];
    ws.klist = ws.vlist
        .reduce(function (a, list) {
        let percentage = list[0][2];
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
    if (0) {
        console.dir(ws, {
            depth: 5,
            colors: true,
        });
    }
    return () => {
        let r = random.next();
        let rs = ws.vlist[ws.vlist.length - 1];
        for (let k in ws.klist) {
            if (r <= ws.klist[k]) {
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
function _createWeight(arr, getWeight = _getWeight) {
    let sum = 0;
    let psum = 0;
    let c = [];
    let ls2 = Object.entries(arr)
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
    });
    let ls = ls2
        .reduce(function (a, entrie) {
        entrie.percentage = entrie.weight / sum;
        let k = entrie.percentage;
        let item = [entrie.key, entrie.value, entrie.percentage];
        if (a.last === 0) {
            a.last = entrie.percentage;
        }
        else {
            a.last += entrie.percentage;
        }
        //a.klist.push(a.last)
        //a.plist.push(entrie.percentage)
        a.vlist.push([item]);
        return a;
    }, {
        //klist: [],
        //plist: [],
        vlist: [],
        last: 0,
    });
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
// @ts-ignore
Object.freeze(exports);
