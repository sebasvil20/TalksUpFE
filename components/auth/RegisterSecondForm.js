import { useState, useContext } from 'react'

import {
  Spacer,
  Input,
  Button,
  Grid,
  Loading,
  Card,
  Text,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { validations } from '../../utils'
import { AuthContext } from '../../context'
import { ErrorCard } from '../errorCard'

import { motion } from 'framer-motion'

export const RegisterSecondForm = ({ setStepper }) => {
  const { updateUser, userName, userId } = useContext(AuthContext)
  const [showUpdateError, setShowUpdateError] = useState(false)
  const [savingRegister, setSavingRegister] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onUpdateUser = async ({
    firstName,
    lastName,
    phoneNumber,
    birthDate,
  }) => {
    setSavingRegister(true)
    setShowUpdateError(false)
    const isValidUpdate = await updateUser({
      UserID: userId,
      FirstName: firstName,
      LastName: lastName,
      BirthDate: birthDate,
      PhoneNumber: phoneNumber,
    })
    setSavingRegister(false)

    if (!isValidUpdate) {
      setShowUpdateError(true)
      setTimeout(() => {
        setShowUpdateError(false)
      }, 3000)
      return
    }
    setStepper(3)
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
      onSubmit={handleSubmit(onUpdateUser)}
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      noValidate
    >
      {showUpdateError && (
        <ErrorCard
          message='Intentelo de nuevo'
          title='Error guardando los datos'
          show={showUpdateError}
        />
      )}
      <Card color='success'>
        <Text css={{ fontWeight: '$bold', color: '$white' }} span>
          Hi {userName}, welcome to TalksUp!
        </Text>
        <Text css={{ color: '$white' }} span>
          To continue, we need basic information about you
        </Text>
      </Card>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        <Grid xs={12} sm={6}>
          <Input
            placeholder='Type your first name'
            label='First name'
            width='100%'
            {...register('firstName', {
              required: 'Este campo es requerido',
              validate: validations.isString,
            })}
            helperText={errors.firstName?.message}
            color={!!errors.firstName && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            placeholder='Type your last name'
            width='100%'
            label='Last name'
            {...register('lastName', {
              required: 'Este campo es requerido',
              validate: validations.isString,
            })}
            helperText={errors.lastName?.message}
            color={!!errors.lastName && 'error'}
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            width='100%'
            label='Phone number (Without ext code)'
            type='number'
            {...register('phoneNumber')}
            helperText='Optional'
          />
        </Grid>
        <Grid xs={12} sm={6}>
          <Input
            width='100%'
            label='Birth date'
            type='date'
            {...register('birthDate', {
              required: 'Este campo es requerido',
            })}
            helperText={errors.birthDate?.message}
            color={!!errors.birthDate && 'error'}
          />
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Button
        type='submit'
        disabled={savingRegister}
        color='secondary'
        shadow
        width='70%'
      >
        {savingRegister ? (
          <Loading type='points' color='currentColor' size='sm' />
        ) : (
          'Save'
        )}
      </Button>
    </motion.form>
  )
}
