import type { TImage } from "./Image.types"
import styles from "./Image.module.scss"

export const Image = (props: TImage) => {
	return <figure className={styles["imageFigure"]}>
		<img {...props} />
	</figure>
}