import { Card } from "../../atoms/card/Card"
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Text } from "../../atoms/text/Text";
import { Button } from "../../atoms/button/Button";
import type { TFavoriteCities } from "./FavoriteCities.types";
import styles from "./FavoriteCities.module.scss"

export const FavoriteCities = ({ favoriteCities }: TFavoriteCities) => {
	return <Card className={styles["favoriteCitiesCard"]}>
		<span className={styles["favoriteCitiesTitle"]}><StarBorderIcon color="warning" /><Text.Paragraph>Favorite Cities</Text.Paragraph></span>

		<br />

		{
			favoriteCities.length > 0 ? <div className={styles["pills"]}>
				{
					favoriteCities.map(city => <Button role="presentation" key={city} variant="border">{city}</Button>)
				}
			</div> :
				<Text.Paragraph>No favorite cities yet. Star a city to add it here.</Text.Paragraph>
		}
	</Card>
}