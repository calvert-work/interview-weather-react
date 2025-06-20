import { axiosInstance } from "../../network/axiosInstance"
import { useMutate } from "../../network/useMutate"

const networkCall = async (): Promise<string> => {
	const { data } = await axiosInstance.delete(`/api/weather/history`)

	return data.message
}

export const useClearSearchHistoryService = (successCb: () => void, errorCb: () => void) => {
	return useMutate<string>({
		mutationFn: () => networkCall(),
		successCb,
		errorCb
	})
}