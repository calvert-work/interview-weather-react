import { unixToLocalDate } from "../../src/utils/unixToLocalDate"

describe("unix to local date unit test", () => {
	test("returns correct format", () => {
		const timestamp = 1718563200
		const date = new Date(timestamp * 1000).toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		})

		expect(unixToLocalDate(timestamp)).toBe(date)
	})
})