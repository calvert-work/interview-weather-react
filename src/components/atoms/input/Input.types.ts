export type TInput = {
	id: string
	className?: string
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
	value: string
	disabled?: boolean
	autoFocus?: boolean
}