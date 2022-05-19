import React from 'react'
import { RegisterForm } from './RegisterForm'
import { useTheme, Container } from '@nextui-org/react'
import { AuthHeader } from '../header/AuthHeader'

export const RegisterContainer = () => {
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
          shadow:
            'box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px',
        }}
      >
        <AuthHeader
          title='Register'
          subtitle='Already have an account?'
          link='/'
          linkTitle='Login now'
        />
        <RegisterForm />
      </Container>
    </Container>
  )
}
