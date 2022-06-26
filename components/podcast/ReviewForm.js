import { useState } from 'react'
import { useRouter } from 'next/router'

import {
  Button,
  Input,
  Loading,
  Textarea,
  Text,
  Grid,
  Spacer,
  Modal,
} from '@nextui-org/react'
import Rating from '@mui/material/Rating'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'

import { talksUpApi } from '../../api'
import { validations } from '../../utils'

export const ReviewForm = ({ visible, closeHandler, podcast_id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const [rate, setRate] = useState(5)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSaveReview = async ({ title, review }) => {
    setLoading(true)
    try {
      var body = JSON.stringify({
        title: title,
        review: review,
        rate: rate,
        lang_id: Cookies.get('lang'),
        podcast_id: podcast_id,
        user_id: Cookies.get('user_id'),
      })
      const { data } = await talksUpApi.post('/reviews', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setLoading(false)
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
      }, 4000)
    }

    setLoading(false)
    router.reload()
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
        <Text h3>Agregar nueva review</Text>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSaveReview)} noValidate>
          <Spacer />
          <Grid.Container gap={1.5} justify='center'>
            <Grid xs={12} justify='center'>
              <Input
                clearable
                bordered
                labelPlaceholder='Titulo'
                {...register('title', {
                  required: 'Este campo es requerido',
                  validate: validations.isString,
                  minLength: {
                    value: 5,
                    message: 'Min. 5 caracteres',
                  },
                  maxLength: {
                    value: 40,
                    message: 'Max. 40 caracteres'
                  }
                })}
                helperText={errors.title?.message}
                color={!!errors.title && 'error'}
              />
            </Grid>
            <Grid xs={12} justify='center'>
              <Rating
                name='simple-controlled'
                value={rate}
                onChange={(event, newValue) => {
                  setRate(newValue)
                }}
              />
            </Grid>
            <Grid xs={12} justify='center'>
              <Textarea
                minRows={6}
                label='¿Que te parecio este podcast?'
                placeholder='Escribe una reseña mas detallada'
                {...register('review', {
                  required: 'Este campo es requerido',
                  validate: validations.isString,
                  minLength: {
                    value: 15,
                    message: 'Min. 15 caracteres',
                  },
                })}
                helperText={errors.review?.message}
                color={!!errors.review && 'error'}
              />
            </Grid>
            <Grid xs={12} justify='center'>
              <Button
                type='submit'
                disabled={loading}
                color='secondary'
                shadow
                width='70%'
                css={{
                  zIndex: 1,
                }}
              >
                {loading ? (
                  <Loading type='points' color='currentColor' size='sm' />
                ) : (
                  'Guardar'
                )}
              </Button>
            </Grid>
          </Grid.Container>
        </form>
      </Modal.Body>
    </Modal>
  )
}
