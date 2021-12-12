
const UUID4_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export { UUID4_PATTERN }

export function isUUID4(id: string)
{
	return UUID4_PATTERN.test(id);
}
