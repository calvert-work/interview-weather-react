import { axiosInstance } from "../network/axiosInstance"
import { useGet } from "../network/useGet"
import type { SuggestedLocation } from "../types/SuggestedLocation.types"

const networkCall = async (city: string): Promise<SuggestedLocation[]> => {
	const { data } = await axiosInstance.get(`/api/location/suggestion/${city}`)

	return data as SuggestedLocation[]
}

export const useGetLocationSuggestions = (city: string, source: "user" | "suggested" | "default") => {
	return useGet<SuggestedLocation[]>({
		queryKey: ["getLocationSuggestions", city],
		queryFn: () => networkCall(city),
		enabled: !!city && source === "user"
	})
}