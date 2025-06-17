import { render, screen } from "@testing-library/react";
import { SearchSection } from "../../../src/components/organisms/searchSection/SearchSection";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

describe("SearchSection unit test", async () => {
	const mockSearchBoxChange = vi.fn();
	const mockSearchClick = vi.fn();
	const mockSwitchToggle = vi.fn();
	const mockSuggestedCityClick = vi.fn();

	test("render search section with the search bar, search button, and temperature unit toggle", async () => {
		const user = userEvent.setup()

		render(
			<SearchSection
				onChange={mockSearchBoxChange}
				value={"las vegas, us"}
				onClick={mockSearchClick}
				suggestedCities={[]}
				onSuggestedCityClick={mockSuggestedCityClick}
				isToggled={false}
				onToggle={mockSwitchToggle} />
		)
		const searchBox = screen.getByRole('textbox', { name: /search current weather and 5 days forecast by city name/i })
		const searchButton = screen.getByRole('button', { name: /search/i })
		const switchBtn = screen.getByRole('checkbox')

		expect(screen.getByText(/search city/i)).toBeInTheDocument();
		expect(searchBox).toBeInTheDocument();
		expect(searchButton).toBeInTheDocument();
		expect(screen.getByText(/°c/i)).toBeInTheDocument()
		expect(screen.getByText(/°f/i)).toBeInTheDocument()
		expect(switchBtn).toBeInTheDocument()
		expect(screen.getByTestId("DeviceThermostatIcon")).toBeInTheDocument()

		expect(searchBox).toHaveValue("las vegas, us")

		await user.type(searchBox, "las vegas");
		expect(mockSearchBoxChange).toHaveBeenCalledTimes(9);

		await user.click(searchButton)
		expect(mockSearchClick).toHaveBeenCalledTimes(1)
	});

	test("render suggested city list", async () => {
		const user = userEvent.setup()

		render(
			<SearchSection
				onChange={mockSearchBoxChange}
				value={""}
				onClick={mockSearchClick}
				suggestedCities={["Las Vegas, US", "Seattle, Washington"]}
				onSuggestedCityClick={mockSuggestedCityClick}
				isToggled={false}
				onToggle={mockSwitchToggle} />
		)

		const lasVegas = screen.getByRole('option', { name: /las vegas, us/i })
		const seattle = screen.getByRole('option', { name: /seattle, washington/i })

		expect(lasVegas).toBeInTheDocument();
		expect(seattle).toBeInTheDocument();

		await user.click(lasVegas)
		expect(mockSuggestedCityClick).toHaveBeenCalledTimes(1)

		await user.click(seattle)
		expect(mockSuggestedCityClick).toHaveBeenCalledTimes(2)
	});
});