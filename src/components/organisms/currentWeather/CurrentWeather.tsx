import { Button } from "../../atoms/button/Button"
import { Card } from "../../atoms/card/Card"
import { Text } from "../../atoms/text/Text"
import styles from "./CurrentWeather.module.scss"
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import type { TCurrentWeather } from "./TCurrentWeather.types";
import { Image } from "../../atoms/image/Image";
import { unixToLocalTime } from "../../../util/unixToLocalTime";
import { unixToLocalDate } from "../../../util/unixToLocalDate";
import { axiosInstance } from "../../../network/axiosInstance";
import type { AxiosError } from "axios";
import { convertedTemp } from "../../../util/getTemperature";
import { useContext } from "react";
import { AppContext } from "../../../context/AppContext";

export const CurrentWeather = (props: TCurrentWeather) => {
	const {
		weatherData,
		temperatureUnit = "c",
		favoriteCities,
		updateSavedFavoriteCities
	} = props

	const { setToastMsg } = useContext(AppContext);

	const cityName = weatherData?.name ?? "N/A";
	const cityNameLowerCased = weatherData?.name.toLowerCase() ?? "N/A";

	const countryCode = weatherData?.sys.country ?? "N/A"

	const mainTemp = weatherData?.main.temp

	const isFavoriteCity = favoriteCities.find(city => city.city_name.toLowerCase() === cityNameLowerCased)

	const favoriteClick = async () => {
		try {
			const response = await axiosInstance.post("/api/weather/favorites", {
				city: cityName,
				countryCode: countryCode
			})

			if (response.status === 201) {
				updateSavedFavoriteCities([...favoriteCities, response.data.data])
			}
		} catch (error) {
			if ((error as AxiosError).status === 409) {
				const foundId = favoriteCities.find(city => city.city_name.toLowerCase() === cityNameLowerCased)?.id

				if (foundId) {
					const response = await axiosInstance.delete(`/api/weather/favorites/${foundId}`)

					if (response.status === 200) {
						updateSavedFavoriteCities(favoriteCities.filter(city => city.city_name.toLowerCase() !== cityNameLowerCased))
					}
				}
			} else {
				setToastMsg({ message: "Only logged in user can save favorite city", type: "error" })
			}
		}
	}

	if (!weatherData) {
		return <Text.Paragraph className={styles["noWeatherData"]}>No weather data</Text.Paragraph>
	}

	return <Card className={styles["currentWeatherCard"]}>
		<>
			<div className={styles["titleArea"]}>
				<span className={styles["titleArea__location"]}>
					<Text.Paragraph className={styles["titleArea__location__city"]}>{cityName}</Text.Paragraph>
					<Text.Paragraph className={styles["titleArea__location__country"]}>({countryCode})</Text.Paragraph>
				</span>

				<Button ariaLabel={isFavoriteCity ? `Click button to remove ${cityName} from the favorite list` : `Click button to add ${cityName} to the favorite list`} variant="icon" onClick={favoriteClick}>
					{
						isFavoriteCity ? <StarIcon color="warning" /> : <StarBorderIcon />
					}
				</Button>
			</div>


			<div className={styles["contentArea"]}>
				<div className={styles["contentArea__leftDetailsContainer"]}>
					<Image src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`} alt="" height={50} width={50} />
					<div className={styles["contentArea__leftDetailsContainer__details"]}>
						<Text.Paragraph className={styles["temperature"]}>{convertedTemp(temperatureUnit, mainTemp)}&deg;{`${temperatureUnit.toUpperCase()}`}</Text.Paragraph>
						<Text.Paragraph>{weatherData?.weather[0].main ?? "N/A"}</Text.Paragraph>
						<Text.Paragraph>Feels like {convertedTemp(temperatureUnit, weatherData?.main.feels_like)}&deg;{`${temperatureUnit.toUpperCase()}`}</Text.Paragraph>
					</div>
				</div>

				<div className={styles["contentArea__rightDetailsContainer"]}>
					<div className={styles["contentArea__rightDetailsContainer__details"]}>
						<Text.Paragraph>{unixToLocalDate(weatherData?.dt)}</Text.Paragraph>
						<Text.Paragraph>Humidity: {weatherData?.main.humidity ?? "N/A"}%</Text.Paragraph>
						<Text.Paragraph>Sunrise: {unixToLocalTime(weatherData?.sys.sunrise)}</Text.Paragraph>
					</div>

					<div className={styles["contentArea__rightDetailsContainer__details"]}>
						<Text.Paragraph>Wind: {weatherData?.wind.speed ?? "N/A"} m/s</Text.Paragraph>
						<Text.Paragraph>Sunset: {unixToLocalTime(weatherData?.sys.sunset)}</Text.Paragraph>
					</div>
				</div>
			</div>
		</>
	</Card>
}