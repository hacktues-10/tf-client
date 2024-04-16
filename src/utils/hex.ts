export function arrayBufferToHex(arrayBuffer: ArrayBuffer) {
	return Array.from(new Uint8Array(arrayBuffer))
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
}

export function hexToArrayBuffer(hex: string) {
	return new Uint8Array(hex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))).buffer;
}
