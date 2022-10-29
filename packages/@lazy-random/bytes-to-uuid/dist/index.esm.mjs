import { BYTE_TO_HEX_TO_LOWER_CASE as e } from "@lazy-random/shared-lib";

function _createBytesToUuidFn(t = e) {
  return (e, o) => {
    let r = o || 0;
    return [ t[e[r++]], t[e[r++]], t[e[r++]], t[e[r++]], "-", t[e[r++]], t[e[r++]], "-", t[e[r++]], t[e[r++]], "-", t[e[r++]], t[e[r++]], "-", t[e[r++]], t[e[r++]], t[e[r++]], t[e[r++]], t[e[r++]], t[e[r++]] ].join("");
  };
}

function bytesToUuid(t, o, r = e) {
  let n = o || 0;
  return [ r[t[n++]], r[t[n++]], r[t[n++]], r[t[n++]], "-", r[t[n++]], r[t[n++]], "-", r[t[n++]], r[t[n++]], "-", r[t[n++]], r[t[n++]], "-", r[t[n++]], r[t[n++]], r[t[n++]], r[t[n++]], r[t[n++]], r[t[n++]] ].join("");
}

export { _createBytesToUuidFn, bytesToUuid, bytesToUuid as default };
//# sourceMappingURL=index.esm.mjs.map
