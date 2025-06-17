export const unixToLocalTime = (timestamp?: number) => {
	if (timestamp === null || timestamp === undefined || timestamp < 0) {
		return "N/A"
	}

	return new Date(timestamp * 1000).toLocaleTimeString(undefined, {
		hour: "numeric",
		minute: "2-digit",
		hour12: true
	});
}

