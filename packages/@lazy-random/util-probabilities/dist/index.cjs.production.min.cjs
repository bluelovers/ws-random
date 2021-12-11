"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.get_prob=function(t,e){let r=e,o=[],u=0,n=t-1;for(;n--;){let e=Math.round(r/t);o.push(e),u+=e,r-=e}return o.unshift(e-u),o},exports.get_prob_float=function(t,e){let r=e,o=[],u=0,n=t-1;for(;n--;){let e=r/t;o.push(e),u+=e,r-=e}return o.unshift(e-u),o};
//# sourceMappingURL=index.cjs.production.min.cjs.map
