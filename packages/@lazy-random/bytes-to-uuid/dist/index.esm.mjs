import { BYTE_TO_HEX_TO_LOWER_CASE } from '@lazy-random/shared-lib';

function _createBytesToUuidFn(bth = BYTE_TO_HEX_TO_LOWER_CASE) {
  return (buf, offset) => {
    let i = offset || 0;
    return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
  };
}
function bytesToUuid(buf, offset, bth = BYTE_TO_HEX_TO_LOWER_CASE) {
  let i = offset || 0;
  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

export { _createBytesToUuidFn, bytesToUuid, bytesToUuid as default };
//# sourceMappingURL=index.esm.mjs.map
