import { useState, useContext } from 'react'

import {
  Spacer,
  Button,
  Grid,
  Loading,
  Card,
  Text,
  Textarea,
} from '@nextui-org/react'
import { useForm } from 'react-hook-form'

import { AuthContext } from '../../context'
import { ErrorCard } from '../errorCard'

import { motion } from 'framer-motion'

export const RegisterThirdForm = ({ setStepper }) => {
  const { associateLikesWithUser, userName, userId } = useContext(AuthContext)
  const [showUpdateError, setShowUpdateError] = useState(false)
  const [savingRegister, setSavingRegister] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onUpdateUser = async ({ categories }) => {
    setSavingRegister(true)
    setShowUpdateError(false)
    const isValidUpdate = await associateLikesWithUser({
      UserID: userId,
      Categories: categories,
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
          Cool {userName},
        </Text>
        <Text css={{ color: '$white' }} span>
          Now let&apos;s define some categories of your interest
        </Text>
      </Card>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        <Grid xs={12}>
          <Textarea width='100%' placeholder='Add max 3 categories' />
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
