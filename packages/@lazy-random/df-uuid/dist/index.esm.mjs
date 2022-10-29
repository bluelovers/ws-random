import { BYTE_TO_HEX_TO_UPPER_CASE as r, BYTE_TO_HEX_TO_LOWER_CASE as t } from "@lazy-random/shared-lib";

import { dfUniformBytes as f } from "@lazy-random/df-uniform";

import { _createBytesToUuidFn as o } from "@lazy-random/bytes-to-uuid";

function dfUuidV4(a, i) {
  const d = f(a, 16), n = o(i ? r : t);
  return () => {
    let r = d();
    return r[6] = 0x0f & r[6] | 0x40, r[8] = 0x3f & r[8] | 0x80, n(r);
  };
}

const a = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function isUUID4(r) {
  return a.test(r);
}

export { a as UUID4_PATTERN, dfUuidV4 as default, dfUuidV4, isUUID4 };
//# sourceMappingURL=index.esm.mjs.map
