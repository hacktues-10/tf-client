export function projectIdsToMapString(projectIds: number[]) {
	let bitMap = 0n;
	for (const id of projectIds) {
		bitMap |= 1n << BigInt(id);
	}
	return bitMap.toString();
}
const BITMAP_PARAM = '👉';
export function encodeBitmap(bitmap: bigint) {
	return new URLSearchParams({ [BITMAP_PARAM]: bitmap.toString(), v: '1' }).toString();
}
