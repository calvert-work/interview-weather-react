import { useContext, useEffect, useState } from "react"
import { Header } from "../../components/organisms/header/Header"
import { useDebounce } from "../../hooks/useDebounce"
import type { TFavoriteCityResponseObject } from "../../types/FavoriteCityResponseObject.types"
import { useRegisterService } from "../../services/auth/useRegisterService"
import { AppContext } from "../../context/AppContext"
import { useLoginService } from "../../services/auth/useLoginService"
import { useGetFavoriteCities } from "../../services/favoriteCities/useGetFavoriteCities"
import { useGetSearchHistoryService } from "../../services/history/useGetSearchHistoryService"
import { setUserId, userId } from "../../network/axiosInstance"
import styles from "./WeatherDashboard.module.scss"
import { SearchHistory } from "../../components/organisms/searchHistory/SearchHistory"
import { useClearSearchHistoryService } from "../../services/history/useClearSearchHistoryService"
import { SearchSection } from "../../components/organisms/searchSection/SearchSection"
import { useGetLocationSuggestions } from "../../services/useGetLocationSuggestions"
import type { AxiosError } from "axios"
import type { SuggestedLocation } from "../../types/SuggestedLocation.types"
import { useGetCurrentWeatherService } from "../../services/weather/useGetCurrentWeatherService"
import { CurrentWeather } from "../../components/organisms/currentWeather/CurrentWeather"
import { ForecastWeather } from "../../components/organisms/forecastWeather/ForecastWeather"
import { FavoriteCities } from "../../components/organisms/favoriteCities/FavoriteCities"
import { updateCache } from "../../network/updateCache"
import { useSaveFavoriteCity } from "../../services/favoriteCities/useSaveFavoriteCity"
import { useDeleteFavoriteCity } from "../../services/favoriteCities/useDeleteFavoriteCity"
import { useForecastWeatherService } from "../../services/weather/useForecastWeatherService"

export const WeatherDashboard = () => {
	const [isToggled, setIsToggled] = useState<boolean>(false)
	const [searchedCity, setSearchedCity] = useState<{ city: string, source: "user" | "suggested" | "default" }>({ city: "", source: "default" })
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
	const [userEmail, setUserEmail] = useState<string>('')
	const [userFirstName, setUserFirstName] = useState<string>('')
	const [savedFavoriteCities, setSavedFavoriteCities] = useState<string[]>([])

	const { setToastMsg } = useContext(AppContext);

	/**
	 * Login api call
	 */
	const { mutateAsync: loginUserApiCall, isPending: loginPending } = useLoginService(
		userEmail,
		(userId) => {
			setIsLoggedIn(true);
			setUserId(userId)
			setToastMsg({ message: `Welcome back, ${userEmail}`, type: "success" })
		},
		() => {
			setIsLoggedIn(false);
			setUserEmail("")
			setUserFirstName("")
			setToastMsg({ message: "Login failed, try again", type: "error" })
		}
	)

	/**
	 * Register api call
	 */
	const { mutateAsync: registerUserApiCall, isPending: registerPending } = useRegisterService(
		userFirstName,
		userEmail,
		(userId) => {
			setIsLoggedIn(true);
			setUserId(userId)
			setToastMsg({ message: `Welcome, ${userEmail}`, type: "success" })
		},
		() => {
			setIsLoggedIn(false);
			setUserEmail("")
			setUserFirstName("")
			setToastMsg({ message: "Could be a bad user input, try again", type: "error" })
		}
	)

	/**
	 * retrieve favorite cities when user id is available
	 */
	const { data: favoriteCitiesData } = useGetFavoriteCities(userId)
	useEffect(() => {
		// return favorite cities in string array
		const cities = favoriteCitiesData?.map((item: TFavoriteCityResponseObject) => `${item.city_name}, ${item.country_code}`)

		setSavedFavoriteCities(cities ?? [])
	}, [favoriteCitiesData])

	/**
	 * retrieve search history when user id is available
	 */
	const { data: searchHistoryData } = useGetSearchHistoryService(userId)

	/**
	 * Clear all search history
	 */
	const { mutateAsync: clearHistoryApiCall } = useClearSearchHistoryService(
		() => {
			setToastMsg({ message: "History cleared", type: "success" })
		},
		() => {
			setToastMsg({ message: "Failed to clear history, server error", type: "error" })
		},
	)

	/**
	 * Get location suggestions at the search bar area
	 */
	const debouncedCity = useDebounce(searchedCity, 1000);
	const { data: suggestions } = useGetLocationSuggestions(debouncedCity.city, debouncedCity.source)
	const suggestedCities = suggestions?.map(
		(item: SuggestedLocation) => `${item.name}, ${item.state}, ${item.country}`
	);

	useEffect(() => {
		if (suggestions?.length === 0) {
			setToastMsg({ message: "Invalid city, try again", type: "error" })
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [suggestions])

	/**
	 * Get current weather of the city
	 */
	const { data: currentWeatherData, refetch: getCurrentWeatherRefetch, isFetching: getCurrentWeatherFetching, } = useGetCurrentWeatherService(searchedCity.city, userId)
	useEffect(() => {
		if (isLoggedIn) {
			const locationStringArray = searchedCity.city.split(",");
			const newHistoryEntry = `${locationStringArray[0]}, ${locationStringArray[2] || locationStringArray[1]}`;

			(async () => {
				await updateCache(["getSearchHistory", userId], (oldHistory: string[] | undefined) => {
					return oldHistory?.includes(newHistoryEntry) ? oldHistory : [...(oldHistory ?? []), newHistoryEntry]
				})
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentWeatherData])

	/**
	 * Save city to favorite only if user id is available
	 * Calls delete favorite city if the city is already favorited
	 */
	const { mutateAsync: saveFavoriteCityApiCall } = useSaveFavoriteCity(
		currentWeatherData?.name,
		currentWeatherData?.sys.country,
		async (newFavoriteCity: TFavoriteCityResponseObject) => {
			await updateCache(["getFavoriteCities", userId], (oldFavorite: TFavoriteCityResponseObject[] | undefined) => [...(oldFavorite ?? []), newFavoriteCity])
		},
		async (statusCode: number) => {
			if (statusCode === 409) {
				const deleteId = favoriteCitiesData?.find(city => city.city_name.toLowerCase() === currentWeatherData?.name.toLowerCase())?.id

				if (deleteId) {
					await deleteFavoriteCityApiCall(deleteId)
				}
			} else if (statusCode === 400) {
				setToastMsg({ message: "Only logged in user can save favorite city", type: "error" })
			} else {
				setToastMsg({ message: `Failed to add ${currentWeatherData?.name} to the favorite list, server error`, type: "error" })
			}
		}
	)

	const { data: forecastWeatherData, refetch: getForecastWeatherRefetch, isFetching: forecastWeatherFetching } = useForecastWeatherService(searchedCity.city)

	/**
	 * Add city to favorite
	 */
	const saveFavoriteCity = async () => {
		await saveFavoriteCityApiCall()
	}

	/**
	 * Delete favorite city
	 */
	const { mutateAsync: deleteFavoriteCityApiCall } = useDeleteFavoriteCity(
		async (deleteId: string) => {
			await updateCache(["getFavoriteCities", userId], (oldFavorite: TFavoriteCityResponseObject[] | undefined) => { return oldFavorite?.filter(city => city.id !== deleteId) ?? [] })

			setToastMsg({ message: `Removed ${searchedCity.city} from favorite list`, type: "success" })
		},
		async () => {
			setToastMsg({ message: `Failed to removed ${searchedCity.city} from favorite list`, type: "error" })
		}
	)

	/**
	 * Toggle temperature unit switch to change temperature unit
	 */
	const toggleTemperatureUnit = () => {
		setIsToggled(!isToggled)
	}

	const cityInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const searched = event.target.value;

		setSearchedCity({ city: searched, source: "user" });
	}

	const suggestedCityClick = (city: string) => {
		setSearchedCity({ city, source: "suggested" });
	}

	const searchWeather = () => {
		if (searchedCity.source === "suggested") {
			try {
				getCurrentWeatherRefetch()
				getForecastWeatherRefetch()
			} catch (error) {
				if ((error as AxiosError).status === 404) {
					setToastMsg({ message: "Invalid city or country", type: "error" })
				}
			}
		} else {
			setToastMsg({ message: "Select an option from the search dropdown to proceed", type: "info" })
		}
	}

	const loginUser = async () => {
		await loginUserApiCall()
	}

	const registerUser = async () => {
		await registerUserApiCall()
	}

	const clearHistory = async () => {
		await clearHistoryApiCall()
		await updateCache(["getSearchHistory", userId], [])
	}

	return <>
		<Header
			isLoggedIn={isLoggedIn}
			registerUser={registerUser}
			loginUser={loginUser}
			email={userEmail}
			firstName={userFirstName}
			setUserEmail={setUserEmail}
			setUserFirstName={setUserFirstName}
			isLoading={loginPending || registerPending}
		/>

		<SearchSection
			onChange={cityInputChange}
			value={searchedCity?.city}
			onClick={searchWeather}
			suggestedCities={suggestedCities as string[] ?? []}
			onSuggestedCityClick={suggestedCityClick}
			isToggled={isToggled}
			onToggle={toggleTemperatureUnit}
		/>

		<br />

		<CurrentWeather
			isLoading={getCurrentWeatherFetching}
			saveFavoriteCity={saveFavoriteCity}
			favoriteCities={favoriteCitiesData ?? []}
			weatherData={currentWeatherData}
			temperatureUnit={isToggled ? "f" : "c"}
		/>

		<br />

		<ForecastWeather isLoading={forecastWeatherFetching} forecastData={forecastWeatherData ?? []} temperatureUnit={isToggled ? "f" : "c"} />

		<br />

		<section className={styles["favoriteAndHistoryContainer"]}>
			<FavoriteCities favoriteCities={savedFavoriteCities ?? []} />
			<SearchHistory history={searchHistoryData ?? []} clearHistory={clearHistory} />
		</section>
	</>
}