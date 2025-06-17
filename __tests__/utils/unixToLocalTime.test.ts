import { unixToLocalTime } from "../../src/util/unixToLocalTime"

describe("unix to local time unit test", () => {
	test("matches expected format using a fixed locale", () => {
		const timestamp = 1718574000
		const expected = new Date(timestamp * 1000).toLocaleTimeString("en-US", {
			hour: "numeric",
			minute: "2-digit",
			hour12: true
		})
		expect(unixToLocalTime(timestamp)).toBe(expected)
	})
})