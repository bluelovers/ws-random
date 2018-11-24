Object.defineProperty(exports, "__esModule", {
    value: !0
});

const ow_1 = require("../util/ow"), byte_1 = require("./byte");

function uniformBytes(e, t, r) {
    ow_1.default(t).integer.gt(0);
    const o = byte_1.default(e, r);
    return () => {
        let e = t, r = [];
        for (;e--; ) r.push(o());
        return r;
    };
}

exports.default = uniformBytes, Object.freeze(exports);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJvd18xIiwicmVxdWlyZSIsImJ5dGVfMSIsInVuaWZvcm1CeXRlcyIsInJhbmRvbSIsInNpemUiLCJ0b1N0ciIsImRlZmF1bHQiLCJpbnRlZ2VyIiwiZ3QiLCJmbiIsImkiLCJhcnIiLCJwdXNoIiwiZnJlZXplIl0sIm1hcHBpbmdzIjoiQUFBQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLE9BQU9DLFFBQVEsZUFDZkMsU0FBU0QsUUFBUTs7QUFDdkIsU0FBU0UsYUFBYUMsR0FBUUMsR0FBTUM7SUFDaENOLEtBQUtPLFFBQVFGLEdBQU1HLFFBQVFDLEdBQUc7SUFDOUIsTUFBTUMsSUFBS1IsT0FBT0ssUUFBUUgsR0FBUUU7SUFDbEMsT0FBTztRQUNILElBQUlLLElBQUlOLEdBQ0pPO1FBQ0osTUFBT0QsT0FDSEMsRUFBSUMsS0FBS0g7UUFFYixPQUFPRTs7OztBQUdmZCxRQUFRUyxVQUFVSixjQUVsQlAsT0FBT2tCLE9BQU9oQiJ9