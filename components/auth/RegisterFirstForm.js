import { useState, useRef, useContext } from 'react'

import { Spacer, Input, Button, Grid, Loading } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import { validations } from '../../utils'
import { AuthContext } from '../../context'
import { ErrorCard } from '../errorCard'

export const RegisterFirstForm = ({ setStepper }) => {
  const { registerUser, loginUser } = useContext(AuthContext)
  const [showRegisterError, setShowRegisterError] = useState(false)
  const [loadingRegister, setLoadingRegister] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = useRef({})
  password.current = watch('password', '')

  const onRegisterUser = async ({
    email,
    publicName,
    password,
    country,
    lang,
  }) => {
    setShowRegisterError(false)
    setLoadingRegister(true)
    const isValidRegister = await registerUser({
      Email: email,
      PublicName: publicName,
      Password: password,
      Country: country,
      Language: lang,
    })

    const isValidLogin = await loginUser(email, password)
    setLoadingRegister(false)

    if (!isValidRegister || !isValidLogin) {
      setShowRegisterError(true)
      setTimeout(() => {
        setShowRegisterError(false)
      }, 3000)
      return
    }

    setStepper(2)
  }

  return (
    <motion.form
      transition={{ duration: 0.5 }}
      initial={{
        opacity: 0,
        x: 200,
      }}
      animate={{ x: 0, opacity: 1, position: 'unset' }}
      exit={{ x: -200, opacity: 0, position: 'absolute' }}
      onSubmit={handleSubmit(onRegisterUser)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
    >
      {showRegisterError && (
        <ErrorCard
          message='Email o contraseña invalidos'
          title='Error iniciando sesión'
          show={showRegisterError}
        />
      )}
      <Grid.Container gap={2} justify='center'>
        <Grid xs={12} sm={6}>
          <Input
            placeholder='Type your email'
            label='Email'
            width='100%'
            type='email'
            {...register('email', {
              required: 'Este campo es requerido',
              validate: validations.isEmail,
            })}
            helperText={errors.email?.message}
            color={!!errors.email && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            placeholder='Nickname or username'
            width='100%'
            label='Public name'
            {...register('publicName', {
              required: 'Este campo es requerido',
              validate: validations.isString,
            })}
            helperText={errors.publicName?.message}
            color={!!errors.publicName && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input.Password
            placeholder='Type your password'
            label='Password'
            width='100%'
            {...register('password', {
              required: 'Este campo es requerido',
              minLength: {
                value: 8,
                message: 'Al menos 8 caracteres',
              },
            })}
            helperText={errors.password?.message}
            color={!!errors.password && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input.Password
            placeholder='Type your password'
            label='Password confirmation'
            width='100%'
            {...register('confirmPwd', {
              required: 'Este campo es requerido',
              validate: (value) =>
                value === password.current || 'The passwords do not match',
            })}
            helperText={errors.confirmPwd?.message}
            color={!!errors.confirmPwd && 'error'}
          />
        </Grid>
        <Grid xs={6}>
          <select {...register('country')}>
            <option value='CO'>Colombia</option>
          </select>
        </Grid>
        <Grid xs={6}>
          <select {...register('lang')}>
            <option value='ESP' defaultValue>
              Español
            </option>
            <option value='ENG'>English</option>
          </select>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Button
        type='submit'
        disabled={loadingRegister}
        color='secondary'
        shadow
        width='70%'
      >
        {loadingRegister ? (
          <Loading type='points' color='currentColor' size='sm' />
        ) : (
          'Register'
        )}
      </Button>
    </motion.form>
  )
}
