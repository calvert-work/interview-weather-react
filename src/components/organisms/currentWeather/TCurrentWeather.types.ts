import type { TCurrentWeatherData } from "../../../types/CurrentWeatherResponseObject.types"
import type { TFavoriteCityResponseObject } from "../../../types/FavoriteCityResponseObject.types"

export type TCurrentWeather = {
	weatherData: TCurrentWeatherData | null
	temperatureUnit: "c" | "f"
	favoriteCities: TFavoriteCityResponseObject[]
	updateSavedFavoriteCities: (newList: TFavoriteCityResponseObject[]) => void
}