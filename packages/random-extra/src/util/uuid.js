/**
 * Created by user on 2018/11/17/017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UUID4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
function isUUID4(id) {
    return exports.UUID4_PATTERN.test(id);
}
exports.isUUID4 = isUUID4;
// @ts-ignore
Object.freeze(exports);
