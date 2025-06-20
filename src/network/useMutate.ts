import { useMutation, type MutationFunction } from "@tanstack/react-query";

type TMutateProps<TData, TError = unknown, TVariables = void, TContext = unknown> = {
	mutationFn: MutationFunction<TData, TVariables>,
	successCb?: (
		data: TData,
		variables: TVariables,
		context: TContext | undefined
	) => Promise<unknown> | unknown,
	errorCb?: (
		error: TError | Error,
		variables: TVariables,
		context: TContext | undefined
	) => Promise<unknown> | unknown
};

export const useMutate = <
	TData,
	TError = unknown,
	TVariables = void,
	TContext = unknown
>({
	mutationFn,
	successCb,
	errorCb
}: TMutateProps<TData, TError, TVariables, TContext>) => {
	return useMutation<TData, TError, TVariables, TContext>({
		mutationFn,
		onSuccess: successCb,
		onError: errorCb
	});
};
