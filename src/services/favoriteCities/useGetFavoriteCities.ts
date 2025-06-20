import { axiosInstance } from "../../network/axiosInstance"
import { useGet } from "../../network/useGet"
import type { TFavoriteCityResponseObject } from "../../types/FavoriteCityResponseObject.types"

const networkCall = async (userId: string | null): Promise<TFavoriteCityResponseObject[]> => {
	const { data } = await axiosInstance.get(`/api/weather/favorites`, {
		params: {
			userId
		}
	})

	return data.data as TFavoriteCityResponseObject[]
}

export const useGetFavoriteCities = (userId: string | null) => {
	return useGet<TFavoriteCityResponseObject[]>({
		queryKey: ["getFavoriteCities", userId],
		queryFn: () => networkCall(userId),
		enabled: !!userId
	})
}