import type { TForecastResponseObject } from "../../../types/ForecastResponseObject.types"

export type TForecastWeather = {
	forecastData: TForecastResponseObject[],
	temperatureUnit: "c" | "f",
	isLoading: boolean
}