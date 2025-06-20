import { axiosInstance } from "../../network/axiosInstance"
import { useGet } from "../../network/useGet"
import type { TForecastResponseObject } from "../../types/ForecastResponseObject.types"

const networkCall = async (city: string): Promise<TForecastResponseObject[]> => {
	const { data } = await axiosInstance.get(`/api/weather/forecast/${city}`)

	const forecastOfNoonOnly = data.data.list.filter((item: TForecastResponseObject) => item.dt_txt.includes("00:00:00"))

	return forecastOfNoonOnly as TForecastResponseObject[]
}

export const useForecastWeatherService = (city: string) => {
	return useGet<TForecastResponseObject[]>({
		queryKey: ["getForecastWeather", city],
		queryFn: () => networkCall(city),
		enabled: false,
		keepPrevData: true
	})
}