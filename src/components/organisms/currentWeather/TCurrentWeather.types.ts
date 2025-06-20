import type { TCurrentWeatherData } from "../../../types/CurrentWeatherResponseObject.types"
import type { TFavoriteCityResponseObject } from "../../../types/FavoriteCityResponseObject.types"

export type TCurrentWeather = {
	weatherData?: TCurrentWeatherData
	temperatureUnit: "c" | "f"
	favoriteCities: TFavoriteCityResponseObject[]
	saveFavoriteCity: () => void
	isLoading: boolean
}