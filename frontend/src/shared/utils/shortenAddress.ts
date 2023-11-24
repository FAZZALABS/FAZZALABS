export function shortenAddress(address: string, length = 4, ends = 4) {
	return `${address.slice(0, 2 + length)}..${address.slice(
		-ends
	)}`.toLowerCase();
}
