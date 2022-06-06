import { RegisterForm } from './RegisterForm'
import { useTheme, Container, Spacer } from '@nextui-org/react'

import { AuthHeader } from '../header'
import { ThemeSwitcher, LangSwitcher } from '../themeConfig'

export const RegisterContainer = ({ categories }) => {
  const { theme } = useTheme()
  return (
    <Container
      css={{
        backgroundImage: `url(/LoginBackground.svg)`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundColor: '#000',
        padding: '15px 15px',
        minHeight: '100vh',
        minWidth: '100%',
        margin: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container
        css={{
          width: '40%',
          '@lgMax': {
            width: '60%',
          },
          '@smMax': {
            width: '100%',
            padding: '10px',
          },
          background: theme?.colors.background?.value,
          padding: '40px',
          borderRadius: '15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          shadow:
            'box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <AuthHeader
          title='Registro'
          subtitle='¿Ya tienes una cuenta?'
          link='/'
          linkTitle='Inicia sesión ahora'
        />
        <Container
          css={{ display: 'flex', width: 'max-content', margin: 'auto' }}
        >
          <ThemeSwitcher customStyle={{ margin: '0px 10px' }} />
          <LangSwitcher />
        </Container>
        <Spacer />
        <RegisterForm categories={categories} />
      </Container>
    </Container>
  )
}
