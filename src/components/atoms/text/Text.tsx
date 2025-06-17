/* eslint-disable react-refresh/only-export-components */
import type { TText } from "./Text.types"
import styles from "./Text.module.scss"

const H1 = ({ children, className, ...rest }: TText) => {
	return <h1 tabIndex={0} className={`${styles["text"]} ${className ?? ""}`} {...rest}>{children}</h1>
}

const Paragraph = ({ children, className, ...rest }: TText) => {
	return <p tabIndex={0} className={`${styles["text"]} ${className ?? ""}`} {...rest}>{children}</p>
}

export const Text = {
	H1,
	Paragraph
}