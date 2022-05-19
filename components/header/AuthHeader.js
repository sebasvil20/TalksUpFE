import React from 'react'
import {
  useTheme,
  Spacer,
  Input,
  Button,
  Image,
  Text,
  Link,
  Grid,
  Container,
} from '@nextui-org/react'

export const AuthHeader = ({ title, subtitle, link, linkTitle }) => {
  const { type, theme } = useTheme()
  return (
    <Container
      css={{
        backgroundColor: theme?.colors.background?.value,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        src={type == 'dark' ? '/logo_light.png' : '/logo_dark.png'}
        alt='Talks up logo'
        width={100}
      />

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
        <Spacer y={1.6} />
    </Container>
  )
}
