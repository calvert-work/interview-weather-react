import type { AxiosError } from "axios"
import { axiosInstance } from "../../network/axiosInstance"
import { useMutate } from "../../network/useMutate"

const networkCall = async (firstName: string, email: string): Promise<string> => {
	const registerResponse = await axiosInstance.post('/api/weather/register', {
		firstName,
		email
	})

	return registerResponse.data.data.userId as string
}

export const useRegisterService = (firstName: string, email: string, successCb: (userId: string) => void, errorCb: () => void) => {
	return useMutate<string, AxiosError>({
		mutationFn: () => networkCall(firstName, email),
		successCb,
		errorCb
	})
}