import { useState } from 'react'

import Cookies from 'js-cookie'
import { Modal, Button, Text } from '@nextui-org/react'

import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import AdminPanelSettingsTwoToneIcon from '@mui/icons-material/AdminPanelSettingsTwoTone'

import { SuccessCard, ErrorCard } from '../errorCard'
import { talksUpApi } from '../../api'
import { IconButton } from './'

export const UpgradeToAdminConfirmationModal = ({
  user_id,
  public_name,
  fetchData,
  role,
}) => {
  const [visible, setVisible] = useState(false)
  const [visibleSuccess, setVisibleSuccess] = useState(false)
  const [visibleError, setVisibleError] = useState(false)

  const upgradeUser = async () => {
    try {
      console.log(Cookies.get('token'))
      const { data } = await talksUpApi.put(`/users/admins/${user_id}`, null, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setVisibleSuccess(true)
      setTimeout(() => {
        setVisibleSuccess(false)
      }, 3000)
      setVisible(false)
      fetchData()
      return
    } catch (error) {
      console.log(error)
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
          message='Nuevo administrador'
          title='Acción ejecutada'
          show={visibleSuccess}
        />
      )}
      {visibleError && (
        <ErrorCard
          message='No se pudo hacer admin'
          title='Error'
          show={visibleError}
        />
      )}
      <IconButton onClick={() => setVisible(true)}>
        {role == 1 ? (
          <AdminPanelSettingsTwoToneIcon
            size={20}
            fill='#FC8B8B'
            style={{ color: '#FC8B8B' }}
          />
        ) : (
          <AdminPanelSettingsIcon style={{ color: '#4E74FF' }} />
        )}
      </IconButton>
      <Modal
        closeButton
        aria-labelledby='modal-title'
        open={visible}
        onClose={() => setVisible(false)}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            {role == 1
              ? `¿Esta seguro de quitar el Admin a ${public_name}?`
              : `¿Esta seguro de hacer Admin a ${public_name}?`}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text color='#4E4B66' css={{ fontSize: '12px', textAlign: 'center' }}>
            {role == 1
              ? `${public_name} ya no tendrá acceso a esta pantalla ni podra modificar información importante`
              : `${public_name} podra hacer a los otros usuarios administradores o modificar recursos importantes`}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={() => setVisible(false)}>
            Cancelar
          </Button>
          <Button
            auto
            onClick={() => {
              upgradeUser()
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
