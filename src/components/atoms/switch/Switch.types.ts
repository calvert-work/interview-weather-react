export type TSwitch = {
	checked: boolean
	leftLabel?: string
	leftAriaLabel?: string
	rightLabel?: string
	rightAriaLabel?: string
	switchLabel?: React.ReactNode
	htmlFor: string
	disableRipple?: boolean
	onChange: (event: React.ChangeEvent) => void
}