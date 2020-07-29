"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_by_weight_1 = require("./internal/item-by-weight");
function itemByWeight(random, arr, options) {
    /*
    let ws = _createWeight(arr, options)

    ws = _sortWeight(random, ws, options);

    ws = _percentageWeight(random, ws);
     */
    let ws = item_by_weight_1._calcWeight(random, arr, options);
    const { vlist, klist } = ws;
    //console.dir(ws)
    ws = void 0;
    arr = void 0;
    options = void 0;
    return () => {
        return vlist[item_by_weight_1._itemByWeightCore(random.next(), klist)];
    };
}
exports.default = itemByWeight;
//# sourceMappingURL=item-by-weight.js.map