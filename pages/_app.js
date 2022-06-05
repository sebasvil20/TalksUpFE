import { NextUIProvider } from '@nextui-org/react'
import CssBaseline from '@mui/material/CssBaseline'

import '../styles/globals.css'

import { AuthProvider, UIProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <CssBaseline />
      <AuthProvider>
        <UIProvider>
          <Component {...pageProps} />
        </UIProvider>
      </AuthProvider>
    </NextUIProvider>
  )
}

export default MyApp
