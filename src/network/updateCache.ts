import type { QueryKey } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

export const updateCache = async (queryKey: QueryKey, value: unknown) => {
	await queryClient.setQueryData(queryKey, value)
}