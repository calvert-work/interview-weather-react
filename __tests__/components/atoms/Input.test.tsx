import { render, screen } from "@testing-library/react";
import { Input } from "../../../src/components/atoms/input/Input";
import { vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import '@testing-library/jest-dom'

describe("Input component test", async () => {
	const user = userEvent.setup()
	const mockOnChange = vi.fn();

	test("renders with default type text", async () => {

		render(<Input value="city" id={"test"} onChange={mockOnChange} />);
		const input = screen.getByRole("textbox");

		expect(input).toBeInTheDocument();
		expect(input).toHaveAttribute("type", "text");
		expect(input).toHaveAttribute("id", "test");

		await user.type(input, "a");
		expect(mockOnChange).toHaveBeenCalledTimes(1);
	});

	test("applies custom className along with default", async () => {
		render(<Input value="city" id={"test"} onChange={mockOnChange} className="custom-class" />);
		const input = screen.getByRole("textbox");

		expect(input.className).toContain("input__textbox");
		expect(input.className).toContain("custom-class");
	});
});
