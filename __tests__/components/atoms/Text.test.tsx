import { render, screen } from "@testing-library/react"
import { Text } from "../../../src/components/atoms/text/Text"

describe("Text component test", () => {
	test("renders Text.H1 with correct content and tag", () => {
		render(<Text.H1>Sample Heading</Text.H1>)
		const heading = screen.getByText("Sample Heading")
		expect(heading.tagName).toBe("H1")
	})

	test("renders Text.Paragraph with correct content and tag", () => {
		render(<Text.Paragraph>Sample paragraph</Text.Paragraph>)
		const paragraph = screen.getByText("Sample paragraph")
		expect(paragraph.tagName).toBe("P")
	})

	test("applies passed className to Text.H1", () => {
		render(<Text.H1 className="custom-class">Heading</Text.H1>)
		const heading = screen.getByText("Heading")
		expect(heading.className).toContain("custom-class")
	})

	test("applies passed className to Text.Paragraph", () => {
		render(<Text.Paragraph className="custom-class">Paragraph</Text.Paragraph>)
		const paragraph = screen.getByText("Paragraph")
		expect(paragraph.className).toContain("custom-class")
	})
})
