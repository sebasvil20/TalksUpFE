import Head from 'next/head'
import { useTheme as useNextTheme } from 'next-themes'
import { Switch, useTheme } from '@nextui-org/react'

import { SunIcon, MoonIcon } from '../icons'

export const MetaDataLayout = ({ children, title }) => {
  const { setTheme } = useNextTheme()
  const { isDark, type } = useTheme()
  return (
    <>
      <Head>
        <title>{title || 'TalksUp'}</title>
        <meta name='author' content='Sebasvil20' />
        <meta name='description' content={`TalksUp - Find your next podcast`} />
        <meta name='keywords' content={`podcasts, recommendations, app`} />
      </Head>

      <main style={{minHeight: '100vh', minWidth: '100%', paddingLeft: '0'}}>
        {children}

        <Switch
          css={{ position: 'absolute', bottom: '10px', right: '10px', '@sm': {bottom: '20px', right: '5px'}}}
          checked={isDark}
          onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          iconOn={<MoonIcon filled color='success' />}
          iconOff={<SunIcon filled color='success' />}
        />
      </main>
    </>
  )
}
