import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "../src/styles/index.scss"
import App from './App.tsx'
import MuiCssBaseline from '@mui/material/CssBaseline'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MuiCssBaseline />
    <App />
  </StrictMode>,
)
