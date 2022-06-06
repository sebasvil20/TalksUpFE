import { useTheme, Grid, Text, Container } from '@nextui-org/react'

import { AuthHeader } from '../header'
import { LoginForm } from './LoginForm'
import { ThemeSwitcher, LangSwitcher } from '../themeConfig'

export const LoginContainer = () => {
  const { theme } = useTheme()
  return (
    <Container css={{ margin: '0', width: '100%!important', paddingLeft: '0' }}>
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
          <AuthHeader
            title='Login'
            subtitle='¿Aún no tienes una cuenta?'
            link='/register'
            linkTitle='Registrate gratis'
          />
          <Container
            css={{
              display: 'flex',
              maxHeight: '30px!important',
              width: 'max-content',
              margin: '0px 0 25px',
            }}
          >
            <ThemeSwitcher customStyle={{ margin: '0px 10px' }} />
            <LangSwitcher />
          </Container>
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
