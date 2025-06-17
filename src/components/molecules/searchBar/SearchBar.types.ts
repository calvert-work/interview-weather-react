export type TSearchBar = {
	htmlFor: string
	value: string
	label?: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	onClick: () => void
	suggestedCities: string[]
	onSuggestedCityClick: (value: string) => void
}