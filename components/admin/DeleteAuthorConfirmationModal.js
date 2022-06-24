import { useState } from 'react'
import Cookies from 'js-cookie'

import {
  Modal,
  Button,
  Text,
  Input,
  Row,
  Checkbox,
  Spacer,
} from '@nextui-org/react'

import { SuccessCard, ErrorCard } from '../errorCard'
import { talksUpApi } from '../../api'
import { IconButton, DeleteIcon } from './'

export const DeleteAuthorConfirmationModal = ({
  author_id,
  name,
  fetchData,
}) => {
  const [visible, setVisible] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleError, setVisibleError] = useState(false)

  const deleteAuthor = async () => {
    try {
      const { data } = await talksUpApi.delete(
        `/authors?author_id=${author_id}`,
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        }
      )
      setVisibleSuccess(true)
      setTimeout(() => {
        setVisibleSuccess(false)
      }, 3000)
      setVisible(false)
      fetchData()
      return
    } catch (error) {
      setVisibleError(true)
      setTimeout(() => {
        setVisibleError(false)
      }, 3000)
      setVisible(false)
      return
    }
  }

  return (
    <>
      {visibleSuccess && (
        <SuccessCard
          title='Acción ejecutada'
          message='Author eliminado'
          show={visibleSuccess}
        />
      )}
      {visibleError && (
        <ErrorCard
          title='Error'
          message='No se pudo eliminar'
          show={visibleError}
        />
      )}
      <IconButton onClick={() => setVisible(true)}>
        <DeleteIcon size={20} fill='#FF0080' />
      </IconButton>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            ¿Esta seguro de eliminar a {name}?
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text color='#4E4B66' css={{ fontSize: '12px', textAlign: 'center' }}>
            Eliminará tambien todas los podcasts de &quot;{name}&quot;,
            junto con sus reviews
          </Text>
          <Spacer />
          <Text color='$error' css={{ fontSize: '12px', textAlign: 'center' }}>
            Esta acción es irreversible
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat onClick={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button
            auto
            color='error'
            onClick={() => {
              deleteAuthor()
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
