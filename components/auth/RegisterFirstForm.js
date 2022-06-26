import { useState, useRef, useContext } from 'react'

import {
  Spacer,
  Input,
  Button,
  Grid,
  Loading,
  Checkbox,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'

import { validations } from '../../utils'
import { AuthContext } from '../../context'
import { ErrorCard } from '../errorCard'
import { TermsModal } from '../terms'

export const RegisterFirstForm = ({ setStepper }) => {
  const [areTermsChecked, setTermsChecked] = useState(true)
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
      }, 4000)
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
      <AnimatePresence>
        {showRegisterError && (
          <ErrorCard
            title='Error creando usuario'
            message='El correo podria estar tomado'
          />
        )}
      </AnimatePresence>
      <Grid.Container gap={2} justify='center'>
        <Grid xs={12} sm={6}>
          <Input
            placeholder='Escribe tu email'
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
            placeholder='Nickname nombre de usuario'
            width='100%'
            label='Nickname o apodo'
            {...register('publicName', {
              required: 'Este campo es requerido',
              validate: validations.isString,
              minLength: {
                value: 5,
                message: 'Min. 5 caracteres',
              },
              maxLength: {
                value: 20,
                message: 'Max. 20 caracteres',
              },
            })}
            helperText={errors.publicName?.message}
            color={!!errors.publicName && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input.Password
            placeholder='Escribe tu password'
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
            placeholder='Escribe tu password'
            label='Confirmación de contraseña'
            width='100%'
            {...register('confirmPwd', {
              required: 'Este campo es requerido',
              validate: (value) =>
                value === password.current || 'Las contraseñas no coinciden',
            })}
            helperText={errors.confirmPwd?.message}
            color={!!errors.confirmPwd && 'error'}
          />
        </Grid>
        <Grid xs={6}>
          <select
            {...register('country')}
            style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f1f3f5',
              height: '40px',
              borderRadius: '10px',
              padding: '5px 15px 5px 10px',
            }}
          >
            <option value='CO'>Colombia</option>
          </select>
        </Grid>
        <Grid xs={6}>
          <select
            {...register('lang')}
            style={{
              width: '100%',
              border: 'none',
              backgroundColor: '#f1f3f5',
              height: '40px',
              borderRadius: '10px',
              padding: '5px 15px 5px 10px',
            }}
          >
            <option value='ESP' defaultValue>
              Español
            </option>
            <option value='ENG'>English</option>
          </select>
        </Grid>
      </Grid.Container>
      <Spacer y={1.8} />
      <Checkbox
        color='secondary'
        size='sm'
        defaultSelected={true}
        onChange={(e) => {
          setTermsChecked(!areTermsChecked)
        }}
        css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
        }}
      >
        He leido y acepto la
      </Checkbox>
      <TermsModal />
      <Spacer y={1} />
      <Button
        type='submit'
        disabled={loadingRegister || !areTermsChecked}
        color='secondary'
        shadow
        width='70%'
        css={{
          zIndex: 1,
        }}
      >
        {loadingRegister ? (
          <Loading type='points' color='currentColor' size='sm' />
        ) : (
          'Registrarse'
        )}
      </Button>
    </motion.form>
  )
}
