import Snackbar from '@mui/material/Snackbar'
import { WeatherDashboard } from './features/weatherDashboard/WeatherDashboard'
import { useContext, useEffect } from 'react'
import { AppContext } from './context/AppContext'
import { axiosInstance } from './network/axiosInstance'

const toastStyles = {
  error: {
    background: "red",
    color: "white"
  },
  info: {
    background: "blue",
    color: "white"
  },
  success: {
    background: "green",
    color: "white"
  }
}
function App() {
  const { toastMsg, setToastMsg } = useContext(AppContext);

  // this is a wake up call to wake up the backend and database due to the servers used are of free tier
  useEffect(() => {
    (async () => {
      await axiosInstance.get("/api/weather/login/test@test.com")
    })()
  }, [])

  return (
    <>
      <WeatherDashboard />
      <Snackbar
        slotProps={{
          content: {
            style: { ...toastStyles[toastMsg?.type ?? "info"] }
          }
        }}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        message={toastMsg?.message}
        open={!!toastMsg?.message}
        onClose={() => setToastMsg(undefined)}
        autoHideDuration={toastMsg?.duration || 3000}
      />
    </>
  )
}

export default App
