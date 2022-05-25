import { useTheme, Spacer, Text, Link, Container } from '@nextui-org/react'

import { LogoHeader } from './'

export const AuthHeader = ({ title, subtitle, link, linkTitle }) => {
  const { theme } = useTheme()
  return (
    <Container
      css={{
        '@mdMax': {
          textAlign: 'center!important',
        },
        backgroundColor: theme?.colors.background?.value,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <LogoHeader />

      <Text h1>{title}</Text>
      <Text h5>
        {subtitle}
        <Link href={link}>
          <p
            style={{
              color: theme?.colors.link?.value,
              padding: '0 10px',
              margin: '0',
              border: 'none',
              outline: 'none',
              background: 'none',
            }}
          >
            {linkTitle}
          </p>
        </Link>
      </Text>
      <Spacer y={1} />
    </Container>
  )
}
