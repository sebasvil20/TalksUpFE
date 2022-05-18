import { createTheme } from '@nextui-org/react'

export const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      titles: '#D9DBE9',
      background: '#14142B',
      link: '#1CC8EE',
    }, // override dark theme colors
  },
})
