import type { TForecastResponseObject } from "../../../types/ForecastResponseObject.types"

export type TForecastCard = {
	forecastData: TForecastResponseObject,
	temperatureUnit: "c" | "f"
} 