import { celsiusToFahrenheit } from "../../src/utils/celsiusToFahrenheit"

describe("Celsius to Fahrenheit unit test", () => {
	test("Celsius to Fahrenheit", () => {
		expect(celsiusToFahrenheit(0)).toBe(32)
		expect(celsiusToFahrenheit(100)).toBe(212)
		expect(celsiusToFahrenheit(-40)).toBe(-40)
		expect(celsiusToFahrenheit(37)).toBeCloseTo(98.6, 1)
	})
})