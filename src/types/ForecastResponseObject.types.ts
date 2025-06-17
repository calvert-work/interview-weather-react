export type TForecastResponseObject = {
	dt: number,
	main: {
		temp_max: number
	},
	weather: {
		main: string,
		icon: string
	}[],
	dt_txt: string
}