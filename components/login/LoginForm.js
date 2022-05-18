import { useTheme, Spacer, Input, Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { validations } from '../../utils'
import { talksUpApi } from '../../api'
import { ErrorCard } from '../errorCard'

export const LoginForm = () => {
  const [validCredentialsError, setValidCredentialsError] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onLoginUser = async ({ email, password }) => {
    setValidCredentialsError(false)
    try {
      const { data } = await talksUpApi.post('/users/login', {
        email,
        password,
      })
      const { token } = data.data
    } catch (error) {
      setValidCredentialsError(true)
      setTimeout(() => {
        setValidCredentialsError(false)
      }, 3000)
    }
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
        <Button type='submit' color='secondary' shadow width='70%'>
          LogIn
        </Button>
      </form>
    </>
  )
}
