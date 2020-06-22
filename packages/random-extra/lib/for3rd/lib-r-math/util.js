Object.defineProperty(exports, "__esModule", {
    value: !0
});

const libRmath = require("lib-r-math.js");

function fakeLibRMathRng(e) {
    return {
        unif_rand(t) {
            if (t > 1) {
                let r = [];
                for (;t--; ) r[t] = e();
                return r;
            }
            return e();
        }
    };
}

exports.libRmath = libRmath, exports.fakeLibRMathRng = fakeLibRMathRng;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIjAiXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJsaWJSbWF0aCIsInJlcXVpcmUiLCJmYWtlTGliUk1hdGhSbmciLCJmbiIsIltvYmplY3QgT2JqZWN0XSIsIm4iLCJhIl0sIm1hcHBpbmdzIjoiQUFHQUEsT0FBT0MsZUFBZUMsU0FBUztJQUFnQkMsUUFBTzs7O0FBQ3RELE1BQU1DLFdBQVdDLFFBQVE7O0FBRXpCLFNBQVNDLGdCQUFnQkM7SUFDckI7UUFDSUMsVUFBVUM7WUFDTixJQUFJQSxJQUFJLEdBQUc7Z0JBQ1AsSUFBSUM7Z0JBQ0osTUFBT0QsT0FDSEMsRUFBRUQsS0FBS0Y7Z0JBRVgsT0FBT0c7O1lBRVgsT0FBT0g7Ozs7O0FBWG5CTCxRQUFRRSxXQUFXQSxVQWVuQkYsUUFBUUksa0JBQWtCQSJ9