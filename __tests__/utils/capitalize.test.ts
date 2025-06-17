import { capitalize } from "../../src/utils/capitalize";

describe("capitalize unit test", async () => {
	test("text1 is capitalized correctly", async () => {
		const capitalizedText = capitalize("all lower case")
		expect(capitalizedText).toBe("All lower case")
	});

	test("text2 is capitalized correctly", async () => {
		const capitalizedText = capitalize("ALL UPPER CASE")
		expect(capitalizedText).not.toBe("aLL UPPER CASE")
	});
});