"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_by_weight_1 = require("./internal/item-by-weight");
const ow_1 = __importDefault(require("../util/ow"));
function itemByWeightUnique(random, arr, size, options) {
    let ws = item_by_weight_1._createWeight(arr, options);
    ow_1.default(size).integer.gt(1);
    ow_1.default(ws.vlist).have.length.gte(size);
    ws = item_by_weight_1._percentageWeight(random, item_by_weight_1._sortWeight(random, ws, options));
    const { vlist, klist } = ws;
    ws = void 0;
    arr = void 0;
    options = void 0;
    return () => {
        const result = [];
        const size_sub_1 = size - 1;
        const ws = {
            vlist: vlist.slice(),
            klist: klist.slice(),
        };
        for (let i = 0; i < size; i++) {
            let index = item_by_weight_1._itemByWeightCore(random.next(), ws.vlist, ws.klist);
            result.push(ws.vlist[index]);
            if (i < size_sub_1) {
                ws.vlist.splice(index, 1);
                item_by_weight_1._percentageWeight(random, ws);
            }
        }
        return result;
    };
}
exports.default = itemByWeightUnique;
//# sourceMappingURL=item-by-weight-unique.js.map