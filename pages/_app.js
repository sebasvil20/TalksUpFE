import { NextUIProvider } from '@nextui-org/react'
import { darkTheme, lightTheme } from '../themes'
import { ThemeProvider as NextThemesProvider } from 'next-themes'

import '../styles/globals.css'
import { AuthProvider } from '../context'

function MyApp({ Component, pageProps }) {
  return (
    <NextThemesProvider
      defaultTheme={darkTheme}
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
      theme={darkTheme}
    >
      <NextUIProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default MyApp
