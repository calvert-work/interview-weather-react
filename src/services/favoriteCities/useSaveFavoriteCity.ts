import type { AxiosError } from "axios"
import { axiosInstance } from "../../network/axiosInstance"
import { useMutate } from "../../network/useMutate"
import type { TFavoriteCityResponseObject } from "../../types/FavoriteCityResponseObject.types"

const networkCall = async (city: string | undefined, countryCode: string | undefined): Promise<TFavoriteCityResponseObject> => {
	try {
		const { data } = await axiosInstance.post('/api/weather/favorites', {
			city,
			countryCode
		})

		return data.data as TFavoriteCityResponseObject
	} catch (error) {
		throw (error as AxiosError).status as number
	}
}

export const useSaveFavoriteCity = (city: string | undefined, countryCode: string | undefined, successCb: (newFavoriteCity: TFavoriteCityResponseObject) => Promise<void>, errorCb: (statusCode: number) => Promise<void>) => {
	return useMutate<TFavoriteCityResponseObject, number>({
		mutationFn: () => networkCall(city, countryCode),
		successCb,
		errorCb: (statusCode) => errorCb(statusCode as number)
	})
}