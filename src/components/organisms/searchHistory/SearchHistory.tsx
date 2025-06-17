import { Button } from "../../atoms/button/Button"
import { Card } from "../../atoms/card/Card";
import { Text } from "../../atoms/text/Text"
import type { TSearchHistory } from "./SearchHistory.types"
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./SearchHistory.module.scss"
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export const SearchHistory = ({ history, clearHistory }: TSearchHistory) => {
	return <Card className={styles["searchHistoryCard"]}>
		<div>
			<span className={styles["searchHistoryTitle"]}><AccessTimeIcon /><Text.Paragraph>Search History</Text.Paragraph></span>

			<br />

			{
				history.length > 0 ? <div className={styles["pills"]}>
					{
						history.map(city => <Button role="presentation" key={city} variant="border">{city}</Button>)
					}
				</div> :
					<Text.Paragraph>No history</Text.Paragraph>
			}
		</div>

		{
			history.length > 0 && <Button ariaLabel="Click button to clear search history" variant="icon" onClick={clearHistory} iconLeft={<DeleteIcon color="error" />}>Clear History</Button>
		}
	</Card >
}