import { render, screen } from "@testing-library/react";
import { Button } from "../../../src/components/atoms/button/Button";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom'

describe("Button component test", async () => {
	const user = userEvent.setup()

	test("renders with children text", async () => {
		render(<Button>Click Me </Button>);
		expect(screen.getByText("Click Me")).toBeInTheDocument();
	});

	test("calls onClick handler when clicked", async () => {
		const handleClick = vi.fn();
		render(<Button onClick={handleClick}>Click</Button>);
		const button = screen.getByRole("button");

		await user.click(button)
		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	test("applies primary variant class by default", async () => {
		render(<Button>Primary </Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("btn__primary");
	});

	test("applies secondary variant class", async () => {
		render(<Button variant="secondary">Secondary</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("btn__secondary");
	});

	test("applies icon variant class", async () => {
		render(<Button variant="icon">+</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("btn__icon");
	});

	test("renders left icon if provided", async () => {
		const DummyIcon = <svg data-testid="left-icon" />;
		render(<Button iconLeft={DummyIcon}>With Icon</Button>);
		expect(screen.getByTestId("left-icon")).toBeInTheDocument();
	});

	test("applies additional className", async () => {
		render(<Button className="custom-class">Styled</Button>);
		const button = screen.getByRole("button");
		expect(button.className).toContain("custom-class");
	});
});
