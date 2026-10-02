
/**
 * UUID v4 的正規表示式 (Regular Expression)：
 * 第三段固定為 `4` 開頭（版本 4），第四段首字元限 `[89ab]`（RFC 4122 變體）
 * Regular expression for UUID v4: the third group must start with `4` (version 4) and the
 * first character of the fourth group is limited to `[89ab]` (RFC 4122 variant)
 */
const UUID4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export { UUID4_PATTERN }

/**
 * 驗證字串是否符合 UUID v4 格式 / Check whether a string matches the UUID v4 format
 *
 * @param id 待驗證的字串 (String to validate)
 * @returns 符合格式時回傳 true / True when the string matches the UUID v4 format
 */
export function isUUID4(id: string)
{
	return UUID4_PATTERN.test(id);
}
