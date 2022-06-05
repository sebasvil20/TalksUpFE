import { useContext, useState, useEffect } from 'react'

import { Modal, Button, Text, Grid, Spacer, Loading } from '@nextui-org/react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Cookies from 'js-cookie'

import { talksUpApi } from '../../api'
import { AuthContext } from '../../context'

export const EditLikesModal = ({ visible, closeHandler }) => {
  const { user, associateLikesWithUser, checkToken } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  useEffect(() => {
    if (user) {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    setLoading(true)
    const fetchCategories = async () => {
      const { data } = await talksUpApi.get('/categories')
      const fetchedCategories = data.data.map((category) => ({
        id: category.category_id,
        label: category.name,
      }))
      setCategories(fetchedCategories)
    }
    fetchCategories()
    setLoading(false)
  }, [])

  const onAssociateCategories = async () => {
    setLoading(true)
    const isValidUpdate = await associateLikesWithUser({
      UserID: Cookies.get('user_id'),
      Categories: selectedCategories,
    })

    if (!isValidUpdate) {
      setShowError(true)
      setLoading(false)
      return
    }
    setLoading(false)
    checkToken()
    closeHandler()
  }

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeHandler}
    >
      <Modal.Header>
        <Text>Actualiza tus gustos</Text>
      </Modal.Header>
      <Modal.Body>
        <Grid.Container gap={2} justify='center'>
          <Text color='#4E4B66'>Agrega o elimina categorias</Text>
          <Spacer />
          <Text color='#4E4B66' css={{ fontSize: '12px' }}>
            Estas configuraciones las usamos para recomendarte contenido
          </Text>
        </Grid.Container>
        <Spacer y={2} />
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
        {showError && (
          <Text color='error' css={{ fontSize: '12px' }}>
            No se puieron guardar las categorias, intentelo de nuevo
          </Text>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button auto flat color='error' onClick={closeHandler}>
          Cancelar
        </Button>
        <Button
          auto
          type='submit'
          disabled={loading}
          color='secondary'
          shadow
          css={{
            zIndex: 1,
          }}
          onClick={() => onAssociateCategories()}
        >
          {loading ? (
            <Loading type='points' color='currentColor' size='sm' />
          ) : (
            'Guardar cambios'
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
