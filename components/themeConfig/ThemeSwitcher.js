import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

import { SunIcon, MoonIcon } from '../icons'

export const ThemeSwitcher = ({ customStyle }) => {
  const { setTheme } = useNextTheme()
  const { isDark } = useTheme()
  const swithStyle = {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    '@smMax': { top: '20px', right: '5px' },
  }
  return (
    <Switch
      css={customStyle ? customStyle : swithStyle}
      checked={isDark}
      onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
      iconOn={<MoonIcon filled color='success' />}
      iconOff={<SunIcon filled color='success' />}
    />
  )
}
