import type { TInput } from "./Input.types"
import styles from "./Input.module.scss"
import classNames from "classnames"

export const Input = ({ className, ...rest }: TInput) => {
	const inputClasses = classNames(
		styles["input__textbox"],
		className
	)

	return <input className={inputClasses} type="text" {...rest} />
}