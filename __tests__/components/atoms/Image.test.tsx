import { render, screen } from "@testing-library/react";
import { Image } from "../../../src/components/atoms/image/Image";
import '@testing-library/jest-dom'

describe("Image component test", async () => {
	test("renders with src and alt", async () => {
		render(<Image height={50} width={50} src="example.jpg" alt="Example Image" />);

		const img = screen.getByRole("img");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute("src", "example.jpg");
		expect(img).toHaveAttribute("alt", "Example Image");
	});
});
