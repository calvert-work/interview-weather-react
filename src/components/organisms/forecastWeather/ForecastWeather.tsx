import { Card } from "../../atoms/card/Card"
import { Text } from "../../atoms/text/Text"
import { ForecastCard } from "../../molecules/forecastCard/ForecastCard"
import type { TForecastWeather } from "./ForecastWeather.types"
import styles from "./ForecastWeather.module.scss"
import CircularProgress from "@mui/material/CircularProgress"

export const ForecastWeather = ({ forecastData, temperatureUnit, isLoading = false }: TForecastWeather) => {
	return <Card className={styles["forecastContainer"]}>
		<Text.Paragraph>5-Day Forecast</Text.Paragraph>

		<br />

		{
			isLoading && <Card className={styles["forecastLoader"]}><CircularProgress /></Card>
		}

		{
			!isLoading && forecastData?.length > 0 &&
			<div className={styles["forecastContainer__contentContainer"]}>
				{forecastData.map(data =>
					<ForecastCard
						key={`forecast_${data.dt_txt}`}
						forecastData={data}
						temperatureUnit={temperatureUnit}
					/>
				)}
			</div>
		}

		{
			!isLoading && forecastData?.length === 0 && <Text.Paragraph className={styles["forecastContainer__noData"]}>No forecast data</Text.Paragraph>
		}
	</Card>
}