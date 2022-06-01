import { Image, useTheme } from '@nextui-org/react'

export const LogoHeader = ({ witdh }) => {
  const { type } = useTheme()
  return (
    <Image
      src={type == 'dark' ? '/logo_light.png' : '/logo_dark.png'}
      alt='Talks up logo'
      width={witdh ? witdh : 100}
    />
  )
}
