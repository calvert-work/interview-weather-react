import { keepPreviousData, useQuery, type QueryFunction, type QueryKey } from "@tanstack/react-query"

type TGetProps<T> = {
	queryKey: QueryKey,
	queryFn: QueryFunction<T>,
	enabled: boolean,
	keepPrevData?: boolean
}

export const useGet = <T,>({ queryKey, queryFn, enabled = true, keepPrevData = false }: TGetProps<T>) => {
	return useQuery({
		queryKey,
		queryFn,
		staleTime: 60 * 5 * 1000, // 5 min
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: false,
		enabled,
		placeholderData: keepPrevData ? keepPreviousData : undefined
	})
}