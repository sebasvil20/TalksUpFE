import { useContext, useState } from 'react'

import { Spacer, Input, Button, Loading } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'

import { validations } from '../../utils'
import { ErrorCard } from '../errorCard'
import { AuthContext } from '../../context'

export const LoginForm = () => {
  const { loginUser } = useContext(AuthContext)
  const router = useRouter()
  const [validCredentialsError, setValidCredentialsError] = useState(false)
  const [loadingLogin, setLoadingLogin] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onLoginUser = async ({ email, password }) => {
    setValidCredentialsError(false)
    setLoadingLogin(true)
    const isValidLogin = await loginUser(email, password)
    setLoadingLogin(false)

    if (!isValidLogin) {
      setValidCredentialsError(true)
      setTimeout(() => {
        setValidCredentialsError(false)
      }, 3000)
      return
    }

    router.push('/dashboard')
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onLoginUser)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
      >
        {validCredentialsError && (
          <ErrorCard
            message='Email o contraseña invalidos'
            title='Error iniciando sesión'
            show={validCredentialsError}
          />
        )}
        <Input
          placeholder='Type your email'
          label='Email'
          width='70%'
          {...register('email', {
            required: 'Este campo es requerido',
            validate: validations.isEmail,
          })}
          helperText={errors.email?.message}
          color={!!errors.email && 'error'}
          type='email'
        />
        <Spacer y={2} />
        <Input.Password
          placeholder='Type your password'
          label='Password'
          width='70%'
          {...register('password', {
            required: 'Este campo es requerido',
            minLength: { value: 6, message: 'Mínimo 6 caracteres' },
          })}
          helperText={errors.password?.message}
          color={!!errors.password && 'error'}
        />
        <Spacer y={2} />
        <Button
          type='submit'
          disabled={loadingLogin}
          color='secondary'
          shadow
          width='70%'
        >
          {loadingLogin ? (
            <Loading type='points' color='currentColor' size='sm' />
          ) : (
            'LogIn'
          )}
        </Button>
      </form>
    </>
  )
}
