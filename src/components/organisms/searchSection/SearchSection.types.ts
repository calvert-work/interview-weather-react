export type TSearchSection = {
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	onClick: () => void
	suggestedCities: string[]
	onSuggestedCityClick: (city: string) => void
	isToggled: boolean;
	onToggle: () => void;
}