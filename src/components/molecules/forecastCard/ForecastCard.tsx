import { unixToLocalDate } from "../../../utils/unixToLocalDate"
import { Card } from "../../atoms/card/Card"
import { Image } from "../../atoms/image/Image"
import { Text } from "../../atoms/text/Text"
import type { TForecastCard } from "./ForecastCard.types"
import styles from "./ForecastCard.module.scss"
import { convertedTemp } from "../../../utils/convertTemp"

export const ForecastCard = ({ forecastData, temperatureUnit = "c" }: TForecastCard) => {
	return <Card className={styles["cardContainer"]}>
		<Text.Paragraph className={styles["forecastDate"]}>{unixToLocalDate(forecastData?.dt)}</Text.Paragraph>
		<Image src={`https://openweathermap.org/img/wn/${forecastData?.weather[0].icon}.png`} alt="" height={50} width={50} />
		<Text.Paragraph>{convertedTemp(temperatureUnit, forecastData?.main.temp_max)}&deg;{temperatureUnit.toUpperCase()}</Text.Paragraph>
		<Text.Paragraph>{forecastData?.weather[0].main}</Text.Paragraph>
	</Card>
}