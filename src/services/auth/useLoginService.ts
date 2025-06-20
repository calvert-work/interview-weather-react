import type { AxiosError } from "axios"
import { axiosInstance } from "../../network/axiosInstance"
import { useMutate } from "../../network/useMutate"

const networkCall = async (email: string): Promise<string> => {
	const loginResponse = await axiosInstance.post("/api/weather/login", {
		email
	})

	return loginResponse.data.data.id as string
}

export const useLoginService = (email: string, successCb: (userId: string) => void, errorCb: () => void) => {
	return useMutate<string, AxiosError>({
		mutationFn: () => networkCall(email),
		successCb,
		errorCb
	})
}