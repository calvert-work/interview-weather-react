import { render, screen } from "@testing-library/react";
import { Card } from "../../../src/components/atoms/card/Card";
import '@testing-library/jest-dom'

describe("Card component test", async () => {
	test("renders children inside the card", async () => {
		render(<Card><p>Card content</p></Card>);
		expect(screen.getByText("Card content")).toBeInTheDocument();
	});

	test("contains default class", async () => {
		render(<Card>Test</Card>);
		const section = screen.getByText("Test");
		expect(section.className).toContain("card");
	});
});
