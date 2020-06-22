Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow");

exports.default = ((e, t) => {
    ow_1.default(t).integer.gt(0);
    const r = e.dfIrwinHall(t);
    return () => r() / t;
}), Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImRlZmF1bHQiLCJyYW5kb20iLCJuIiwiaW50ZWdlciIsImd0IiwiaXJ3aW5IYWxsIiwiZGZJcndpbkhhbGwiLCJmcmVlemUiXSwibWFwcGluZ3MiOiJBQUFBQSxPQUFPQyxlQUFlQyxTQUFTO0lBQWdCQyxRQUFPOzs7QUFDdEQsTUFBTUMsT0FBT0MsUUFBUTs7QUFDckJILFFBQVFJLFVBQVUsRUFBQ0MsR0FBUUM7SUFFdkJKLEtBQUtFLFFBQVFFLEdBQUdDLFFBQVFDLEdBQUc7SUFDM0IsTUFBTUMsSUFBWUosRUFBT0ssWUFBWUo7SUFDckMsT0FBTyxNQUNJRyxNQUFjSDtJQUk3QlIsT0FBT2EsT0FBT1gifQ==