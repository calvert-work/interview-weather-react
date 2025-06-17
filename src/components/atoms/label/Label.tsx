import classNames from "classnames";
import type { TLabel } from "./Label.types";
import styles from "./Label.module.scss"

export const Label = ({ children, className, ...rest }: TLabel) => {
	const labelClasses = classNames(
		styles["label"],
		className
	)

	return <label className={labelClasses} {...rest}>{children}</label >
}