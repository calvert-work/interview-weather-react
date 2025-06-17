import { render, screen } from "@testing-library/react";
import { Label } from "../../../src/components/atoms/label/Label";
import '@testing-library/jest-dom'

describe("Label component test", async () => {
	test("renders label with children and htmlFor", async () => {
		render(<Label htmlFor="input-id">Enter your name</Label>);

		const label = screen.getByText("Enter your name");
		expect(label).toBeInTheDocument();
		expect(label).toHaveAttribute("for", "input-id");
	});

	test("applies custom className along with default class", async () => {
		render(<Label htmlFor="input-id" className="custom-label">Name</Label>);

		const label = screen.getByText("Name");
		expect(label.className).toContain("label");
		expect(label.className).toContain("custom-label");
	});
});
