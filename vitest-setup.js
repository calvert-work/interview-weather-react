/// <reference types="vitest" />

import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

beforeEach(() => {
	vi.clearAllMocks();
	vi.resetAllMocks()
})