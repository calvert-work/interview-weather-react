import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/index.scss"
import App from './App.tsx'
import MuiCssBaseline from '@mui/material/CssBaseline'
import { AppContextProvider } from './context/AppContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppContextProvider>
      <MuiCssBaseline />
      <App />
    </AppContextProvider>
  </StrictMode>,
)
