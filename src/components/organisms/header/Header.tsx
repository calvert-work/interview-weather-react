import { Image } from "../../atoms/image/Image"
import { Text } from "../../atoms/text/Text"
import { Account } from "../../molecules/account/Account";
import styles from "./Header.module.scss"
import type { THeader } from "./Header.types";

export const Header = (props: THeader) => {
	return <header className={styles["appHeader"]}>
		<div className={styles["headerLogo"]}>
			<Image src="https://openweathermap.org/img/wn/02d@2x.png" alt="" height={100} width={100} />
			<Text.H1>Weather Dashboard</Text.H1>
		</div>

		<Account {...props} />
	</header>
}