import { NextUIProvider } from '@nextui-org/react'
import { AuthProvider } from '../context'
import CssBaseline from '@mui/material/CssBaseline'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <CssBaseline />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextUIProvider>
  )
}

export default MyApp
