import { BYTE_TO_HEX_TO_UPPER_CASE, BYTE_TO_HEX_TO_LOWER_CASE } from '@lazy-random/shared-lib';
import { dfUniformBytes } from '@lazy-random/df-uniform';
import { _createBytesToUuidFn } from '@lazy-random/bytes-to-uuid';

function dfUuidV4(random, toUpperCase) {
  const fn = dfUniformBytes(random, 16);

  const fn2 = _createBytesToUuidFn(toUpperCase ? BYTE_TO_HEX_TO_UPPER_CASE : BYTE_TO_HEX_TO_LOWER_CASE);

  return () => {
    let arr = fn();
    arr[6] = arr[6] & 0x0f | 0x40;
    arr[8] = arr[8] & 0x3f | 0x80;
    let id = fn2(arr);
    return id;
  };
}

const UUID4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUUID4(id) {
  return UUID4_PATTERN.test(id);
}

export { UUID4_PATTERN, dfUuidV4 as default, dfUuidV4, isUUID4 };
//# sourceMappingURL=index.esm.mjs.map
