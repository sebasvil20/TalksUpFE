import { createTheme } from '@nextui-org/react'

export const lightTheme = createTheme({
  type: 'light',
  theme: {
    colors: {
      titles: '#14142B',
      background: '#FCFCFC',
      link: '#6334EB',
    }, // override dark theme colors
  },
})
