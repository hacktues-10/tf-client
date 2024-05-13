import invariant from 'tiny-invariant';

export function projectIdsToMapString(projectIds: number[]) {
	let bitMap = 0n;
	for (const id of projectIds) {
		bitMap |= 1n << BigInt(id);
	}
	return bitMap.toString();
}

export function projectMapStringToIds(projectMapString: string) {
	let bitMap = BigInt(projectMapString);
	const projectIds: number[] = [];
	for (let i = 0; bitMap > 0; i++) {
		if (bitMap & 1n) {
			projectIds.push(i);
		}
		bitMap >>= 1n;
	}
	return projectIds;
}

export function hasMultipleIntersections(projectIdsMap: string, testProjectIdsMap: string) {
	const bitMap = BigInt(projectIdsMap) & BigInt(testProjectIdsMap);
	return bitMap !== 0n && (bitMap & (bitMap - 1n)) !== 0n;
}

const BITMAP_PARAM = '👉';

export function decodeBitmap(projectIdsMap: string) {
	const searchParams = new URLSearchParams(projectIdsMap);
	const searchValue = searchParams.get(BITMAP_PARAM);
	invariant(searchValue !== null, 'Invalid project map string');
	return BigInt(searchValue);
}

export function encodeBitmap(bitmap: bigint) {
	return new URLSearchParams({ [BITMAP_PARAM]: bitmap.toString(), v: '1' }).toString();
}
