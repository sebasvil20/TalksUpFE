import { NextUIProvider } from '@nextui-org/react'
import CssBaseline from '@mui/material/CssBaseline'

import { AuthProvider } from '../context'

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
