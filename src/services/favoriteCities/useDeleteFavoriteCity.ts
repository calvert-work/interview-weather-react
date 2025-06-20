import { axiosInstance } from "../../network/axiosInstance"
import { useMutate } from "../../network/useMutate"

const networkCall = async (deleteId: string): Promise<string> => {
	await axiosInstance.delete(`/api/weather/favorites/${deleteId}`)

	return deleteId as string
}

export const useDeleteFavoriteCity = (successCb: (deleteId: string) => Promise<void>, errorCb: () => Promise<void>) => {
	return useMutate({
		mutationFn: (deleteId: string) => networkCall(deleteId),
		successCb,
		errorCb
	})
}