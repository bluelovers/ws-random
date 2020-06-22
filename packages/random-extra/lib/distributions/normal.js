Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow");

exports.default = ((e, t = 0, r = 1) => (ow_1.default(t).number(), ow_1.default(r).number(), 
() => {
    let o, u, l;
    do {
        l = (o = 2 * e.next() - 1) * o + (u = 2 * e.next() - 1) * u;
    } while (!l || l > 1);
    return t + r * u * Math.sqrt(-2 * Math.log(l) / l);
})), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJyYW5kb20iLCJtdSIsInNpZ21hIiwibnVtYmVyIiwieCIsInkiLCJyIiwibmV4dCIsIk1hdGgiLCJzcXJ0IiwibG9nIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLE9BQU9DLFFBQVE7O0FBQ3JCSCxRQUFRSSxVQUFVLEVBQUNDLEdBQVFDLElBQUssR0FBR0MsSUFBUSxPQUd2Q0wsS0FBS0UsUUFBUUUsR0FBSUUsVUFDakJOLEtBQUtFLFFBQVFHLEdBQU9DO0FBQ2I7SUFDSCxJQUFJQyxHQUFHQyxHQUFHQztJQUNWO1FBR0lBLEtBRkFGLElBQW9CLElBQWhCSixFQUFPTyxTQUFhLEtBRWhCSCxLQURSQyxJQUFvQixJQUFoQkwsRUFBT08sU0FBYSxLQUNSRjtjQUNWQyxLQUFLQSxJQUFJO0lBQ25CLE9BQU9MLElBQUtDLElBQVFHLElBQUlHLEtBQUtDLE1BQU0sSUFBSUQsS0FBS0UsSUFBSUosS0FBS0E7S0FJN0RiLE9BQU9rQixPQUFPaEIifQ==