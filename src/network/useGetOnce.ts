import { keepPreviousData, useQuery, type QueryFunction, type QueryKey } from "@tanstack/react-query"

type TGetOnceProps<T> = {
	queryKey: QueryKey,
	queryFn: QueryFunction<T>,
	enabled: boolean,
	keepPrevData?: boolean
}

export const useGetOnce = <T,>({ queryKey, queryFn, enabled = true, keepPrevData = false }: TGetOnceProps<T>) => {
	return useQuery<T>({
		queryKey,
		queryFn,
		gcTime: 0,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		retry: 3,
		enabled,
		placeholderData: keepPrevData ? keepPreviousData : undefined
	})
}