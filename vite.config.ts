import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: "./vitest-setup.js",
    include: ["./__tests__/**/*.test.ts*", "./__tests__/**/*.spec.ts*"],
    coverage: {
      provider: "istanbul",
      reporter: ["html"],
      exclude: ["dist", "__tests__"]
    }
  },
})
