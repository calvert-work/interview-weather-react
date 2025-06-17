import { useContext, useEffect, useState } from "react"
import { Header } from "../../components/organisms/header/Header"
import { SearchSection } from "../../components/organisms/searchSection/SearchSection"
import { CurrentWeather } from "../../components/organisms/currentWeather/CurrentWeather"
import { axiosInstance, setUserId } from "../../network/axiosInstance"
import type { SuggestedLocation } from "../../types/SuggestedLocation.types"
import { useDebounce } from "../../hooks/useDebounce"
import type { AxiosError } from "axios"
import { ForecastWeather } from "../../components/organisms/forecastWeather/ForecastWeather"
import type { TForecastResponseObject } from "../../types/ForecastResponseObject.types"
import type { TCurrentWeatherData } from "../../types/CurrentWeatherResponseObject.types"
import { FavoriteCities } from "../../components/organisms/favoriteCities/FavoriteCities"
import { SearchHistory } from "../../components/organisms/searchHistory/SearchHistory"
import styles from "./WeatherDashboard.module.scss"
import type { TFavoriteCityResponseObject } from "../../types/FavoriteCityResponseObject.types"
import type { HistoryResponseObject } from "../../types/HistoryResponseObject.types"
import { AppContext } from "../../context/AppContext"
export const WeatherDashboard = () => {
	const [isToggled, setIsToggled] = useState<boolean>(false)
	const [searchedCity, setSearchedCity] = useState<{ city: string, source: "type" | "suggested" | "default" }>({ city: "", source: "default" })
	const [suggestedCities, setSuggestedCities] = useState<string[]>([])
	const [currentWeatherData, setCurrentWeatherData] = useState<TCurrentWeatherData | null>(null)
	const [forecastWeatherData, setForecastWeatherData] = useState<TForecastResponseObject[]>([])
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')
	const [savedFavoriteCities, setSavedFavoriteCities] = useState<TFavoriteCityResponseObject[]>([])
	const [history, setHistory] = useState<string[]>([])

	const { setToastMsg } = useContext(AppContext);

	const debouncedCity = useDebounce(searchedCity, 1000);

	const toggleTemperatureUnit = () => {
		setIsToggled(!isToggled)
	}

	const cityInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const searched = event.target.value;

		setSearchedCity({ city: searched, source: "type" });
	}

	useEffect(() => {
		if (!debouncedCity.city) {
			setSuggestedCities([]);
			return;
		}

		const fetchSuggestions = async () => {
			try {
				const res = await axiosInstance.get(`/api/location/suggestion/${debouncedCity.city}`);
				if (res.status === 200 && res.data.length > 0) {
					const cities = res.data.map(
						(item: SuggestedLocation) => `${item.name}, ${item.state}, ${item.country}`
					);
					setSuggestedCities(cities);
				} else {
					setToastMsg({ message: "Invalid city or country", type: "info" })
					setSuggestedCities([]);
				}
			} catch (error) {
				if ((error as AxiosError).status === 404) {
					setToastMsg({ message: "Invalid city or country", type: "info" })
				}
				setSuggestedCities([]);
			}

			setToastMsg(undefined)
		};

		if (debouncedCity.source === "type") {
			setToastMsg({ message: "Server could be sleeping, give it one min to wake up", type: "info", duration: 120000 })

			fetchSuggestions();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedCity]);

	const suggestedCityClick = (city: string) => {
		setSearchedCity({ city, source: "suggested" });
		setSuggestedCities([]);
	}

	const searchWeather = async () => {
		if (suggestedCities.length === 0 && searchedCity.source === "suggested") {
			try {
				const weatherResponse = await axiosInstance.get(`/api/weather/current/${searchedCity.city}`);

				const forecastResponse = await axiosInstance.get(`/api/weather/forecast/${searchedCity.city}`);

				const forecastOfNoonOnly = forecastResponse.data.data.list.filter((item: TForecastResponseObject) => item.dt_txt.includes("00:00:00"))

				setCurrentWeatherData(weatherResponse.data.data)
				setForecastWeatherData(forecastOfNoonOnly)

				if (isLoggedIn && weatherResponse.data.historyStored === true) {
					const locationStringArray = searchedCity.city.split(",");
					const finalString = `${locationStringArray[0]}, ${locationStringArray[2] || locationStringArray[1]}`

					setHistory([...history, finalString])
				}
			} catch (error) {
				if ((error as AxiosError).status === 404) {
					setToastMsg({ message: "Invalid city or country", type: "error" })
				}
				setSuggestedCities([]);
			}
		} else {
			setToastMsg({ message: "Select an option from the search dropdown to proceed", type: "info" })
		}
	}

	const registerUser = async (firstName: string, email: string) => {
		try {
			const registerResponse = await axiosInstance.post("/api/weather/user", {
				firstName,
				email
			})

			if (registerResponse.status === 201) {
				setUserEmail(email)
				setToastMsg({ message: "Registration successful, go ahead and login", type: "success" })
			}
		} catch {
			setToastMsg({ message: "Are you entering your details correctly? Try registering again", type: "error" })
		}
	}

	const loginUser = async (email: string) => {
		try {
			const registerResponse = await axiosInstance.get(`/api/weather/user/${email}`)

			if (registerResponse.status === 200) {
				const userId = registerResponse.data.data.id
				setToastMsg({ message: "Login success", type: "success" })

				setUserEmail(email)
				setIsLoggedIn(true)
				setUserId(userId)

				getFavoriteCities(userId)
				getHistory()
			}
		} catch {
			setToastMsg({ message: "User does not exist, register yourself now", type: "error" })
		}
	}

	const getFavoriteCities = async (userId: string) => {
		try {
			const getFavoriteCitiesResponse = await axiosInstance.get(`/api/weather/favorites`, {
				params: {
					userId
				}
			})

			if (getFavoriteCitiesResponse.status === 200) {
				setSavedFavoriteCities(getFavoriteCitiesResponse.data.data)
			}
		} catch {
			setSavedFavoriteCities([])
		}
	}

	const getHistory = async () => {
		try {
			const getHistoryResponse = await axiosInstance.get("/api/weather/history")

			if (getHistoryResponse.status === 200) {
				const cities = getHistoryResponse.data.data.map((item: HistoryResponseObject) => `${item.city_name}, ${item.country_code}`);
				setHistory(cities)
			}
		} catch {
			setHistory([])
		}
	}

	const clearHistory = async () => {
		try {
			const clearHistoryResponse = await axiosInstance.delete("/api/weather/history");

			if (clearHistoryResponse.status === 200) {
				setHistory([])
				setToastMsg({ message: "History cleared", type: "success" })
			}
		} catch {
			setToastMsg({ message: "Fail to clear history due to server error", type: "error" })
		}
	}

	const updateSavedFavoriteCities = (newList: TFavoriteCityResponseObject[]) => {
		setSavedFavoriteCities(newList);
		setToastMsg({ message: "Updated favorite cities list", type: "success" })
	}

	return <>
		<Header
			isLoggedIn={isLoggedIn}
			registerUser={registerUser}
			loginUser={loginUser}
			email={userEmail}
		/>

		<SearchSection
			onChange={cityInputChange}
			value={searchedCity?.city}
			onClick={searchWeather}
			suggestedCities={suggestedCities}
			onSuggestedCityClick={suggestedCityClick}
			isToggled={isToggled}
			onToggle={toggleTemperatureUnit}
		/>

		<br />

		<CurrentWeather updateSavedFavoriteCities={updateSavedFavoriteCities} favoriteCities={savedFavoriteCities} weatherData={currentWeatherData} temperatureUnit={isToggled ? "f" : "c"} />

		<br />

		<ForecastWeather forecastData={forecastWeatherData} temperatureUnit={isToggled ? "f" : "c"} />

		<br />

		<section className={styles["favoriteAndHistoryContainer"]}>
			<FavoriteCities favoriteCities={savedFavoriteCities} />
			<SearchHistory history={history} clearHistory={clearHistory} />
		</section>
	</>
}