import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Header } from "../../../src/components/organisms/header/Header"
import { vi } from "vitest"

describe("Header component unit test", () => {
	const mockRegisterUser = vi.fn()
	const mockLoginUser = vi.fn()

	test("renders header and shows Register/Login buttons when not logged in", async () => {
		render(
			<Header
				isLoggedIn={false}
				email=""
				registerUser={mockRegisterUser}
				loginUser={mockLoginUser}
			/>
		)

		expect(screen.getByText("Weather Dashboard")).toBeInTheDocument()
		expect(screen.getByText("Register")).toBeInTheDocument()
		expect(screen.getByText("Login")).toBeInTheDocument()
	})

	test("opens register modal and submits form", async () => {
		const user = userEvent.setup()

		render(
			<Header
				isLoggedIn={false}
				email=""
				registerUser={mockRegisterUser}
				loginUser={mockLoginUser}
			/>
		)

		await user.click(screen.getByText("Register"))
		expect(screen.getByRole("button", { name: /register user/i })).toBeInTheDocument()

		await user.type(screen.getByRole('textbox', { name: /first name/i }), "John");
		await user.type(screen.getByRole('textbox', { name: /email/i }), "john@example.com");

		await user.click(screen.getByRole("button", { name: "Register User" }))

		expect(mockRegisterUser).toHaveBeenCalledWith("John", "john@example.com")
	})

	test("opens login modal and submits form", async () => {
		const user = userEvent.setup()

		render(
			<Header
				isLoggedIn={false}
				email=""
				registerUser={mockRegisterUser}
				loginUser={mockLoginUser}
			/>
		)

		await user.click(screen.getByText("Login"))
		expect(screen.getByRole("button", { name: /login user/i })).toBeInTheDocument()

		await user.type(screen.getByRole('textbox', { name: /email/i }), "jane@example.com")
		await user.click(screen.getByRole("button", { name: "Login User" }))

		expect(mockLoginUser).toHaveBeenCalledWith("jane@example.com")
	})

	test("shows greeting when user is logged in", () => {
		render(
			<Header
				isLoggedIn={true}
				email="test@example.com"
				registerUser={mockRegisterUser}
				loginUser={mockLoginUser}
			/>
		)

		expect(screen.getByText("Hi, test@example.com")).toBeInTheDocument()
	})
})
