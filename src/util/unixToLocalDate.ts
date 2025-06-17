export const unixToLocalDate = (timestamp: number) => new Date(timestamp * 1000).toLocaleDateString(undefined, {
	weekday: 'short',
	month: 'short',
	day: 'numeric'
});

