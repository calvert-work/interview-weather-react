import { axiosInstance } from "../../network/axiosInstance"
import { useGet } from "../../network/useGet"
import type { HistoryResponseObject } from "../../types/HistoryResponseObject.types";

const networkCall = async (): Promise<string[]> => {
	const { data } = await axiosInstance.get(`/api/weather/history`)

	const citiesHistory = data.data.map((item: HistoryResponseObject) => `${item.city_name}, ${item.country_code}`);

	return citiesHistory as string[]
}

export const useGetSearchHistoryService = (userId: string | null) => {
	return useGet<string[]>({
		queryKey: ["getSearchHistory", userId],
		queryFn: () => networkCall(),
		enabled: !!userId
	})
}