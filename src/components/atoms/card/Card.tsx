import classNames from "classnames"
import styles from "./Card.module.scss"

export const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => {

	const cardClasses = classNames(
		styles["card"],
		className
	)

	return <section className={cardClasses}>{children}</section>
}