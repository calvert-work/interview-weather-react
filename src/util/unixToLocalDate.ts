export const unixToLocalDate = (timestamp?: number) => {
	if (timestamp === null || timestamp === undefined || timestamp < 0) {
		return "N/A"
	}

	return new Date(timestamp * 1000).toLocaleDateString(undefined, {
		weekday: 'short',
		month: 'short',
		day: 'numeric'
	});
}

