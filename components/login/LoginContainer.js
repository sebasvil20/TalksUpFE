import {
  useTheme,
  Grid,
  Image,
  Text,
  Container,
  Spacer,
} from '@nextui-org/react'
import Link from 'next/link'

import { LoginForm } from './LoginForm'

export const LoginContainer = () => {
  const { type, theme } = useTheme()
  const buttonStyle = {
    color: theme?.colors.link?.value,
    padding: '0 10px',
    margin: '0',
    border: 'none',
    outline: 'none',
    background: 'none',
  }
  return (
    <Container css={{ margin: '0', width: '100%!important' }}>
      <Grid.Container
        justify='center'
        css={{ margin: '0', width: '100vw!important', height: '100vh' }}
      >
        <Grid
          xs={12}
          md={5}
          css={{
            backgroundColor: theme?.colors.background?.value,
            padding: '20px 40px',
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

          <Text h1>Login</Text>
          <Text h5>
            Don&apos;t have an account?
            <Link href='/register'>
              <a style={buttonStyle}>Sign up for free</a>
            </Link>
          </Text>
          <Spacer y={1.6} />
          <LoginForm />
        </Grid>
        <Grid
          xs={0}
          md={7}
          css={{
            backgroundImage: `url(/LoginBackground.svg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundColor: '#000',
            padding: '15px 15px',
            minHeight: '50vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
            justifyContent: 'end',
          }}
        >
          <Text h2 color='#D9DBE9'>
            Hey
          </Text>
          <Text h2 color='#D9DBE9'>
            Welcome
          </Text>
          <Text h2 color='#D9DBE9'>
            Back
          </Text>
        </Grid>
      </Grid.Container>
    </Container>
  )
}
