"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_by_weight_1 = require("./internal/item-by-weight");
function itemByWeight(random, arr, getWeight, shuffle, disableSort) {
    let ws = item_by_weight_1._createWeight(arr, getWeight || item_by_weight_1._getWeight);
    ws = item_by_weight_1._sortWeight(random, ws, {
        shuffle,
        disableSort,
    });
    ws = item_by_weight_1._percentageWeight(random, ws);
    const { vlist, klist } = ws;
    ws = void 0;
    return () => {
        let r = random.next();
        let rs = vlist[vlist.length - 1];
        /*
        console.dir({
            vlist,
            klist,
        }, {
            depth: null,
        })

        console.dir(rs)
         */
        for (let k in klist) {
            if (r <= klist[k]) {
                rs = vlist[k];
                break;
            }
        }
        //let i = rs.length > 1 ? _randIndex(random, rs.length) : 0
        return rs;
    };
}
exports.default = itemByWeight;
//# sourceMappingURL=item-by-weight.js.map