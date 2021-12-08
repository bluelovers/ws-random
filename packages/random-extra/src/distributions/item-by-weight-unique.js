"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const item_by_weight_1 = require("./internal/item-by-weight");
const expect_1 = require("@lazy-random/expect");
function itemByWeightUnique(random, arr, size, options) {
    let ws = (0, item_by_weight_1._createWeight)(arr, options);
    (0, expect_1.expect)(size).integer.gt(1);
    (0, expect_1.expect)(ws.vlist).have.length.gte(size);
    ws = (0, item_by_weight_1._percentageWeight)(random, (0, item_by_weight_1._sortWeight)(random, ws, options));
    const { vlist, klist } = ws;
    ws = void 0;
    arr = void 0;
    options = void 0;
    const size_sub_1 = size - 1;
    return () => {
        const result = [];
        const ws = {
            vlist: vlist.slice(),
            klist: klist.slice(),
        };
        for (let i = 0; i < size; i++) {
            let index = (0, item_by_weight_1._itemByWeightCore)(random.next(), ws.klist);
            result.push(ws.vlist[index]);
            if (i < size_sub_1) {
                ws.vlist.splice(index, 1);
                (0, item_by_weight_1._percentageWeight)(random, ws);
            }
        }
        return result;
    };
}
exports.default = itemByWeightUnique;
//# sourceMappingURL=item-by-weight-unique.js.map