import { Label } from "../../atoms/label/Label"
import type { TSearchBar } from "./SearchBar.types"
import { Button } from "../../atoms/button/Button"
import { Input } from "../../atoms/input/Input"
import styles from "./SearchBar.module.scss"

export const SearchBar = ({ htmlFor, label, onClick, suggestedCities, onSuggestedCityClick, ...rest }: TSearchBar) => {
	return <div className={styles["searchBarContainer"]}>
		<div className={styles["searchBarContainer__searchBar"]}>
			<Label htmlFor={htmlFor} >
				{label}

				<div className={styles["searchBarContainer__listContainer"]}>
					<Input id={htmlFor} {...rest} />

					{suggestedCities.length > 0 && (
						<ul
							role="listbox"
							aria-label="Suggested cities"
							className={styles["searchBarContainer__listContainer__listUl"]}
						>
							{suggestedCities.map((city) => (
								<li
									key={city}
									role="option"
									tabIndex={0}
									className={styles["searchBarContainer__listContainer__listLi"]}
									onClick={() => onSuggestedCityClick(city)}
									onKeyDown={e => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											onSuggestedCityClick(city);
										}
									}}
								>
									{city}
								</li>
							))}
						</ul>
					)}
				</div>
			</Label>
			<Button variant="secondary" onClick={onClick}>Search</Button>
		</div>
	</div>
}