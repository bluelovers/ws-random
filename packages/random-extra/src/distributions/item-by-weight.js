"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_by_weight_1 = require("./internal/item-by-weight");
function itemByWeight(random, arr, options) {
    let ws = item_by_weight_1._createWeight(arr, options);
    ws = item_by_weight_1._sortWeight(random, ws, options);
    ws = item_by_weight_1._percentageWeight(random, ws);
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