import { fahrenheitToCelsius } from "../../src/util/fahrenheitToCelsius"

describe("Celsius to Fahrenheit unit test", () => {
	test("Fahrenheit to Celsius", () => {
		expect(fahrenheitToCelsius(32)).toBe(0)
		expect(fahrenheitToCelsius(212)).toBe(100)
		expect(fahrenheitToCelsius(-40)).toBe(-40)
		expect(fahrenheitToCelsius(98.6)).toBeCloseTo(37, 1)
	})
})