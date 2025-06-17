import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Switch } from "../../../src/components/atoms/switch/Switch";
import '@testing-library/jest-dom'
import { vi } from 'vitest';

describe('Switch component test', () => {
	test('renders labels and dynamic aria-label based on checked state', async () => {
		const user = userEvent.setup()
		const mockOnChange = vi.fn()

		const { rerender } = render(
			<Switch
				htmlFor="dark-mode"
				leftLabel="Off"
				rightLabel="On"
				leftAriaLabel="Dark mode off"
				rightAriaLabel="Dark mode on"
				checked={false}
				onChange={mockOnChange}
			/>
		)

		expect(screen.getByText('Off')).toBeInTheDocument()
		expect(screen.getByText('On')).toBeInTheDocument()

		const switchAria1 = document.getElementsByTagName("span")[2]
		expect(switchAria1.ariaDescription).toBe('Selected Dark mode off')

		const switchInput = screen.getByRole("checkbox");
		await user.click(switchInput)
		expect(mockOnChange).toHaveBeenCalledTimes(1)

		rerender(
			<Switch
				htmlFor="dark-mode"
				leftLabel="Off"
				rightLabel="On"
				leftAriaLabel="Dark mode off"
				rightAriaLabel="Dark mode on"
				checked={true}
				onChange={mockOnChange}
			/>
		)
		const switchAria2 = document.getElementsByTagName("span")[2]

		expect(switchAria2.ariaDescription).toBe('Selected Dark mode on')
	})
})
