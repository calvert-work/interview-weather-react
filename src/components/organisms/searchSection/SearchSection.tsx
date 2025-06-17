import { SearchBar } from "../../molecules/searchBar/SearchBar"
import type { TSearchSection } from "./SearchSection.types"
import styles from "./SearchSection.module.scss"
import { Switch } from "../../atoms/switch/Switch"
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';

export const SearchSection = (props: TSearchSection) => {
	const {
		isToggled,
		onToggle,
		...rest
	} = props

	return <section className={styles["searchSection"]}>
		<SearchBar
			label="Search city"
			aria-label="Search current weather and 5 days forecast by city name"
			htmlFor="weatherSearch"
			{...rest}
		/>

		<div className={styles["temperatureUnit"]}>
			<Switch
				checked={isToggled}
				htmlFor=""
				leftLabel="&deg;C"
				leftAriaLabel="temperature unit, celsius"
				rightLabel="&deg;F"
				rightAriaLabel="temperature unit, fahrenheit"
				disableRipple={true}
				onChange={onToggle}
				switchLabel={<span className={styles["hiddenSwitchLabel"]} >Toggle to switch temperature unit, celsius or fahrenheit</span>}
			/>
			<DeviceThermostatIcon aria-hidden={true} />
		</div>
	</section>
}