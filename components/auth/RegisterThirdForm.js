import { useState, useContext } from 'react'

import { Spacer, Button, Grid, Loading, Card, Text } from '@nextui-org/react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'

import { AuthContext } from '../../context'
import { ErrorCard } from '../errorCard'

export const RegisterThirdForm = ({ setStepper, categories }) => {
  const { associateLikesWithUser, userName, userId } = useContext(AuthContext)
  const [showUpdateError, setShowUpdateError] = useState(false)
  const [savingRegister, setSavingRegister] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])

  const {
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onAssociateCategories = async () => {
    setSavingRegister(true)
    setShowUpdateError(false)
    const isValidUpdate = await associateLikesWithUser({
      UserID: userId,
      Categories: selectedCategories,
    })
    setSavingRegister(false)

    if (!isValidUpdate) {
      setShowUpdateError(true)
      setTimeout(() => {
        setShowUpdateError(false)
      }, 3000)
      return
    }

    setStepper(4)
  }

  console.log(selectedCategories)
  return (
    <motion.form
      transition={{ duration: 0.9 }}
      initial={{
        opacity: 0,
        x: 200,
      }}
      animate={{ x: 0, opacity: 1, position: 'unset' }}
      exit={{ x: -200, opacity: 0, position: 'absolute' }}
      onSubmit={handleSubmit(onAssociateCategories)}
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
      <Card css={{ backgroundColor: '$success', p: '10px 15px' }}>
        <Text css={{ fontWeight: '$bold', color: '$white' }} span>
          Cool {userName},
        </Text>
        <Text css={{ color: '$white' }} span>
          Ahora definamos algunas categorías de tu interés. <br /> No te
          preocupes, podrás cambiarlas después en tu perfil de usuario
        </Text>
      </Card>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        <Grid xs={12} css={{ display: 'flex', justifyContent: 'center' }}>
          <Autocomplete
            multiple
            id='tags-outlined'
            fullWidth
            options={categories}
            onChange={(e, v) => {
              v.forEach((value) => {
                setSelectedCategories([...selectedCategories, value.id])
              })
            }}
            getOptionLabel={(option) => option.label}
            filterSelectedOptions
            disableCloseOnSelect
            renderInput={(params) => (
              <TextField
                {...params}
                label='Selecciona 1 o mas categorías'
                placeholder='Favorites'
              />
            )}
          />
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <Grid.Container gap={2} justify='center'>
        <Grid md={6} xs={12} justify='center'>
          <Button
            onPress={() => setStepper(4)}
            color='secondary'
            shadow
            ghost
            css={{
              zIndex: 1,
            }}
          >
            Omitir
          </Button>
        </Grid>
        <Grid md={6} xs={12} justify='center'>
          <Button
            type='submit'
            disabled={savingRegister}
            color='secondary'
            shadow
            css={{
              zIndex: 1,
              width: '30%',
            }}
          >
            {savingRegister ? (
              <Loading type='points' color='currentColor' size='sm' />
            ) : (
              'Guardar gustos'
            )}
          </Button>
        </Grid>
      </Grid.Container>
    </motion.form>
  )
}
