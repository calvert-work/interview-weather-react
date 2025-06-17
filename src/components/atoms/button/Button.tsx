import type { TButton } from "./Button.types"
import styles from "./Button.module.scss"
import classNames from "classnames"

export const Button = (props: TButton) => {
	const {
		children,
		type = "button",
		iconLeft,
		variant = "primary",
		className,
		ariaLabel,
		...rest
	} = props

	const buttonClasses = classNames(
		styles["btn"],
		variant === "primary" && styles["btn__primary"],
		variant === "secondary" && styles["btn__secondary"],
		variant === "action" && styles["btn__action"],
		variant === "border" && styles["btn__border"],
		variant === "icon" && styles["btn__icon"],
		className
	)

	return (
		<button aria-label={ariaLabel} className={buttonClasses} type={type} {...rest}>
			{
				iconLeft &&
				<span className={styles["btnLeftIcon"]}>{iconLeft}</span>
			}
			{children}
		</button>
	)
}