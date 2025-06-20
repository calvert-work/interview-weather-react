import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/index.scss"
import App from './App.tsx'
import MuiCssBaseline from '@mui/material/CssBaseline'
import { AppContextProvider } from './context/AppContextProvider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './network/queryClient.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <MuiCssBaseline />
        <App />
      </AppContextProvider>
    </QueryClientProvider>
  </StrictMode>,
)
