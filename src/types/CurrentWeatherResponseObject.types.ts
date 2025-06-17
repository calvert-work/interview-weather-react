export type TCurrentWeatherData = {
	weather: {
		main: string,
		icon: string
	}[],
	main: {
		temp: number,
		feels_like: number,
		humidity: number
	},
	wind: {
		speed: number
	}
	name: string,
	sys: {
		country: string,
		sunrise: number,
		sunset: number
	},
	dt: number
}