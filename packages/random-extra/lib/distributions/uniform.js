Object.defineProperty(exports, "__esModule", {
    value: !0
});

const math_1 = require("../util/math"), ow_1 = require("../util/ow");

exports.default = ((e, t, r, o) => {
    let u;
    return void 0 === r && (r = void 0 === t ? 1 : t, t = 0), ow_1.default(t).number(), 
    ow_1.default(r).number.gt(t), u = 0 === t && 1 === r ? e.next : 0 === t ? () => e.next() * r : () => e.next() * (r - t) + t, 
    void 0 !== o ? (ow_1.default(o).integer.gte(0), () => math_1.toFixedNumber(u(), o)) : u;
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJtYXRoXzEiLCJyZXF1aXJlIiwib3dfMSIsImRlZmF1bHQiLCJyYW5kb20iLCJtaW4iLCJtYXgiLCJmcmFjdGlvbkRpZ2l0cyIsImZuIiwidW5kZWZpbmVkIiwibnVtYmVyIiwiZ3QiLCJuZXh0IiwiaW50ZWdlciIsImd0ZSIsInRvRml4ZWROdW1iZXIiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsU0FBU0MsUUFBUSxpQkFDakJDLE9BQU9ELFFBQVE7O0FBQ3JCSCxRQUFRSyxVQUFVLEVBQUNDLEdBQVFDLEdBQUtDLEdBQUtDO0lBT2pDLElBQUlDO0lBY0osWUFwQllDLE1BQVJILE1BQ0FBLFNBQWVHLE1BQVJKLElBQW9CLElBQUlBLEdBQy9CQSxJQUFNLElBRVZILEtBQUtDLFFBQVFFLEdBQUtLO0lBQ2xCUixLQUFLQyxRQUFRRyxHQUFLSSxPQUFPQyxHQUFHTixJQUd4QkcsSUFEUSxNQUFSSCxLQUFxQixNQUFSQyxJQUNSRixFQUFPUSxPQUVDLE1BQVJQLElBQ0EsTUFDTUQsRUFBT1EsU0FBU04sSUFJdEIsTUFDTUYsRUFBT1EsVUFBVU4sSUFBTUQsS0FBT0E7U0FHdEJJLE1BQW5CRixLQUNBTCxLQUFLQyxRQUFRSSxHQUFnQk0sUUFBUUMsSUFBSSxJQUNsQyxNQUNJZCxPQUFPZSxjQUFjUCxLQUFNRCxNQUduQ0M7SUFHWFosT0FBT29CLE9BQU9sQiJ9