import { celsiusToFahrenheit } from "./celsiusToFahrenheit"

export const convertedTemp = (unit: "c" | "f", temperature?: number) => {
	if (temperature === null || temperature === undefined) {
		return "N/A"
	}

	return unit === "c" ? temperature.toFixed(0) : celsiusToFahrenheit(temperature).toFixed(0)
}