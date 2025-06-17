export const unixToLocalTime = (timestamp: number) => new Date(timestamp * 1000).toLocaleTimeString(undefined, {
	hour: "numeric",
	minute: "2-digit",
	hour12: true
});

