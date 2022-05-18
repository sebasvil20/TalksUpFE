import '../styles/globals.css'

import { NextUIProvider } from '@nextui-org/react'
import { darkTheme, lightTheme } from '../themes'

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme={darkTheme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
