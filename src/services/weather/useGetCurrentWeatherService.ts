import { axiosInstance } from "../../network/axiosInstance"
import { useGet } from "../../network/useGet"
import type { TCurrentWeatherData } from "../../types/CurrentWeatherResponseObject.types"

const networkCall = async (city: string): Promise<TCurrentWeatherData> => {
	const { data } = await axiosInstance.get(`/api/weather/current/${city}`)

	return data.data as TCurrentWeatherData
}

export const useGetCurrentWeatherService = (city: string, userId: string | null) => {
	return useGet<TCurrentWeatherData>({
		queryKey: ["getCurrentWeather", city, userId],
		queryFn: () => networkCall(city),
		enabled: false,
		keepPrevData: true
	})
}