import { useRouter } from 'next/router'

import { Modal, Button, Text } from '@nextui-org/react'
import Cookie from 'js-cookie'

export const CompleteProfileModal = ({ showModal, closeFunc }) => {
  const router = useRouter()
  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={showModal}
      onClose={() => closeFunc()}
    >
      <Modal.Header>
        <Text id='modal-title' size={18}>
          Bienvenido a
          <Text b size={18} color='#6334EB'>
            {' '}
            TalksUp
          </Text>
        </Text>
      </Modal.Header>
      <Modal.Body css={{ textAlign: 'center' }}>
        <Text>
          Parece que no has completado tu perfil, ¿quieres completarlo ahora?
        </Text>
        <Text color='#4E4B66' css={{ fontSize: '12px' }}>
          Siempre puedes actualizar tu perfil si vas desde el menu de
          navegación, haciendo click en tu nombre
        </Text>
      </Modal.Body>
      <Modal.Footer>
        <Button
          auto
          flat
          color='error'
          onClick={() => {
            closeFunc()
            localStorage.setItem(`updateAsked-${Cookie.get('token')}`, 'true')
          }}
        >
          Nope ❌
        </Button>
        <Button
          auto
          onClick={() => {
            closeFunc()
            localStorage.setItem(`updateAsked-${Cookie.get('token')}`, 'true')
            router.push('/dashboard/user')
          }}
        >
          Vamos 😎
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
