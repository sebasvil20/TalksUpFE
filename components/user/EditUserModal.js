import { useState, useContext } from 'react'

import {
  Modal,
  Input,
  Row,
  Checkbox,
  Button,
  Text,
  Grid,
  Spacer,
  Loading,
  Textarea,
} from '@nextui-org/react'

import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'

import { AuthContext } from '../../context'
import { validations } from '../../utils'

export const EditUserModal = ({ visible, closeHandler }) => {
  const { user, updateUser } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onUpdateUser = async ({
    firstName,
    lastName,
    phoneNumber,
    biography,
  }) => {
    setLoading(true)
    const isValidUpdate = await updateUser({
      UserID: Cookies.get('user_id'),
      FirstName: firstName,
      LastName: lastName,
      PhoneNumber: phoneNumber,
      Biography: biography,
    })
    if (!isValidUpdate) {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
      return
    }

    closeHandler()
    setLoading(false)
  }
  return (
    <Modal
      closeButton
      blur
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text>Actualiza tu usario</Text>
      </Modal.Header>
      <form noValidate onSubmit={handleSubmit(onUpdateUser)}>
        <Modal.Body>
          <Grid.Container gap={2} justify='center'>
            <Text color='#4E4B66'>
              Modifica los datos que creas necesario 😄
            </Text>
            <Spacer />
            <Text color='#4E4B66' css={{ fontSize: '12px' }}>
              Para cambiar tu foto de perfil haz click en ella
            </Text>
            <Spacer />
            <Grid xs={12} sm={6}>
              <Input
                placeholder='Type your first name'
                label='Nombre'
                width='100%'
                {...register('firstName', {
                  required: 'Este campo es requerido',
                  validate: validations.isString,
                  minLength: {
                    value: 2,
                    message: 'Min. 2 caracteres',
                  },
                })}
                initialValue={user.first_name}
                helperText={errors.firstName?.message}
                color={!!errors.firstName && 'error'}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                placeholder='Type your last name'
                width='100%'
                label='Apellido'
                {...register('lastName', {
                  required: 'Este campo es requerido',
                  validate: validations.isString,
                  minLength: {
                    value: 2,
                    message: 'Min. 2 caracteres',
                  },
                })}
                initialValue={user.last_name}
                helperText={errors.lastName?.message}
                color={!!errors.lastName && 'error'}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Input
                width='100%'
                label='Numero de telefono (sin ext)'
                type='number'
                {...register('phoneNumber')}
                initialValue={user.phone_number}
                helperText='Optional'
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <Textarea
                width='100%'
                label='Biografia'
                placeholder='Explica quien eres, que te gusta o algun dato interesante sobre ti 🤯'
                {...register('biography', {
                  validate: validations.isString,
                  minLength: {
                    value: 2,
                    message: 'Min. 2 caracteres',
                  },
                  maxLength: {
                    value: 1000,
                    message: 'Max. 1000 caracteres',
                  },
                })}
                initialValue={user?.biography}
                helperText={
                  errors.biography?.message
                    ? errors.biography?.message
                    : 'Optional'
                }
                color={!!errors.biography && 'error'}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={2} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={closeHandler}>
            Cancelar
          </Button>{' '}
          <Button
            auto
            type='submit'
            disabled={loading}
            color='secondary'
            shadow
            css={{
              zIndex: 1,
            }}
          >
            {loading ? (
              <Loading type='points' color='currentColor' size='sm' />
            ) : (
              'Guardar cambios'
            )}
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
