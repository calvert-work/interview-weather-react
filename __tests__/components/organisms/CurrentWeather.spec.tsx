import { render, screen } from "@testing-library/react";
import { CurrentWeather } from "../../../src/components/organisms/currentWeather/CurrentWeather";
import { vi } from "vitest";
import type { TCurrentWeatherData } from "../../../src/types/CurrentWeatherResponseObject.types";
import type { TFavoriteCityResponseObject } from "../../../src/types/FavoriteCityResponseObject.types";
import userEvent from "@testing-library/user-event";
import { axiosInstance } from "../../../src/network/axiosInstance";
import { AxiosError } from "axios";

vi.mock("../../../src/network/axiosInstance", () => ({
	axiosInstance: {
		post: vi.fn(),
		delete: vi.fn()
	}
}));

const mockSaveFavoriteCity = vi.fn()
const mockWeatherData: TCurrentWeatherData = {
	weather: [{
		main: "Clear",
		icon: "012d"
	}],
	main: {
		temp: 10,
		feels_like: 0,
		humidity: 80
	},
	wind: {
		speed: 100
	},
	name: "las vegas",
	sys: {
		country: "US",
		sunrise: 1718563200,
		sunset: 1718574000
	},
	dt: 0
}

const mockFavoriteCities: TFavoriteCityResponseObject[] = [
	{
		city_name: "las vegas",
		country_code: "US",
		id: "1"
	}
]

const falseMockFavoriteCities: TFavoriteCityResponseObject[] = [
	{
		city_name: "seattle",
		country_code: "US",
		id: "1"
	}
]

describe("CurrentWeather integration test", async () => {
	test("render current weather section with no data", async () => {
		render(
			<CurrentWeather
				weatherData={undefined}
				temperatureUnit={"c"}
				favoriteCities={[]}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		expect(screen.getByText(/no weather data/i)).toBeInTheDocument();
	});

	test("render current weather section with a city current weather, it is not a favorite city and city is added to favorite list", async () => {
		const user = userEvent.setup()

		axiosInstance.post = vi.fn().mockResolvedValueOnce({
			status: 201,
			data: {
				id: 1
			}
		});

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={[]}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		expect(screen.getByText(/las vegas/i)).toBeInTheDocument()
		expect(screen.getByText(/\(us\)/i)).toBeInTheDocument()

		// since the searched city is not a city in favorite list, the favorite button should add the searched city to the list and this is the correct description
		const favoriteBtn = screen.getByRole('button', { name: /click button to add las vegas to the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1) // store las vegas to favorite successfully

		expect(screen.getByRole('figure')).toBeInTheDocument()
		expect(screen.getByText(/10°c/i)).toBeInTheDocument()
		expect(screen.getByText(/clear/i)).toBeInTheDocument()
		expect(screen.getByText(/feels like 0°c/i)).toBeInTheDocument()
		expect(screen.getByText(/wed, dec 31/i)).toBeInTheDocument()
		expect(screen.getByText(/humidity: 80%/i)).toBeInTheDocument()
		expect(screen.getByText(/sunrise: 11:40 am/i)).toBeInTheDocument()
		expect(screen.getByText(/wind: 100 m\/s/i)).toBeInTheDocument()
		expect(screen.getByText(/sunset: 2:40 pm/i)).toBeInTheDocument()
	});

	test("render current weather section with a city current weather in fahrenheit", async () => {
		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"f"}
				favoriteCities={[]}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		expect(screen.getByText(/50°f/i)).toBeInTheDocument()
		expect(screen.getByText(/feels like 32°f/i)).toBeInTheDocument()
	});

	test("render current weather section with a city current weather, it is not a favorite city and 2xx edge case that will not happen", async () => {
		const user = userEvent.setup()

		axiosInstance.post = vi.fn().mockResolvedValueOnce({
			status: 200,
			data: {
				id: 1
			}
		});

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={[]}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		// since the searched city is not a city in favorite list, the favorite button should add the searched city to the list and this is the correct description
		const favoriteBtn = screen.getByRole('button', { name: /click button to add las vegas to the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1)
	});

	test("render current weather section with a city current weather, it is a favorite city and city is removed from favorite", async () => {
		const user = userEvent.setup()

		const conflict409Error = new AxiosError()
		conflict409Error.status = 409
		axiosInstance.post = vi.fn().mockRejectedValueOnce(conflict409Error);

		axiosInstance.delete = vi.fn().mockResolvedValueOnce({
			status: 200
		})

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={mockFavoriteCities}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		// since the searched city is a city in favorite list, the favorite button should remove the searched city from the list and this is the correct description
		const favoriteBtn = screen.getByRole('button', { name: /click button to remove las vegas from the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1) // remove from favorite list successfully
	});

	test("render current weather section with a city current weather, it is a favorite city and failed to be removed from favorite. Favorite city id not found edge case which will not happen", async () => {
		const user = userEvent.setup()

		const conflict409Error = new AxiosError()
		conflict409Error.status = 409
		axiosInstance.post = vi.fn().mockRejectedValueOnce(conflict409Error);

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={falseMockFavoriteCities}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		const favoriteBtn = screen.getByRole('button', { name: /click button to add las vegas to the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1)
	});

	test("render current weather section with a city current weather, it is a favorite city but failed to be removed from the favorite list due to delete operation failure", async () => {
		const user = userEvent.setup()

		const conflict409Error = new AxiosError()
		conflict409Error.status = 409
		axiosInstance.post = vi.fn().mockRejectedValueOnce(conflict409Error);

		axiosInstance.delete = vi.fn().mockResolvedValueOnce({
			status: 500
		})

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={mockFavoriteCities}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		// since the searched city is a city in favorite list, the favorite button should remove the searched city from the list and this is the correct description
		const favoriteBtn = screen.getByRole('button', { name: /click button to remove las vegas from the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1)
	});

	test("render current weather section with a city current weather, it is a favorite city but failed to be removed from the favorite list due to server error", async () => {
		const user = userEvent.setup()

		const conflict500Error = new AxiosError()
		conflict500Error.status = 500
		axiosInstance.post = vi.fn().mockRejectedValueOnce(conflict500Error);

		axiosInstance.delete = vi.fn().mockResolvedValueOnce({
			status: 200
		})

		render(
			<CurrentWeather
				weatherData={mockWeatherData}
				temperatureUnit={"c"}
				favoriteCities={mockFavoriteCities}
				saveFavoriteCity={mockSaveFavoriteCity}
				isLoading={false}
			/>
		)

		// since the searched city is a city in favorite list, the favorite button should remove the searched city from the list and this is the correct description
		const favoriteBtn = screen.getByRole('button', { name: /click button to remove las vegas from the favorite list/i })
		expect(favoriteBtn).toBeInTheDocument()
		await user.click(favoriteBtn);
		expect(mockSaveFavoriteCity).toHaveBeenCalledTimes(1)
	});
});