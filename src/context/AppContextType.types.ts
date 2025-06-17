export type TAppContextType = {
	toastMsg?: TToast
	setToastMsg: React.Dispatch<React.SetStateAction<TToast | undefined>>
}

export type TToast = {
	type: "error" | "success" | "info",
	message: React.ReactNode,
	duration?: number
}