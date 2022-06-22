import { useMemo, useState, useEffect } from 'react'

import {
  Modal,
  Button,
  Text,
  Grid,
  Spacer,
  Loading,
  Link,
  Dropdown,
} from '@nextui-org/react'
import Cookies from 'js-cookie'

import { talksUpApi } from '../../api'
import { Loader } from '../loader'

export const AddToListModal = ({ visible, closeHandler, podcastID }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [lists, setLists] = useState([])
  const [selectedList, setSelectedList] = useState(new Set())

  const selectedName = useMemo(() => {
    if (selectedList.size > 0 && lists.length > 0) {
      let val = Array.from(lists).find(
        (item) => item.key == Array.from(selectedList)[0]
      )
      return val.name
    }
  }, [lists, selectedList])

  useEffect(() => {
    setIsLoading(true)
    const fetchLists = async () => {
      const { data } = await talksUpApi.get(
        `/users/${Cookies.get('user_id')}/lists`,
        {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        }
      )
      const fetchedLists = data.data.map((list) => ({
        key: list.list_id,
        name: list.name,
      }))
      setLists(fetchedLists)
    }
    fetchLists()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (lists.length > 0) {
      setSelectedList(new Set([lists[0].key]))
    }
  }, [lists])

  const onAssociatePodcasts = async () => {
    setIsLoading(true)
    var body = JSON.stringify({
      list_id: Array.from(selectedList)[0],
      podcasts: [podcastID],
    })
    console.log(body)
    const { data } = await talksUpApi.post('/lists/associate', body, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setIsLoading(false)
    closeHandler()
  }

  return (
    <Modal
      closeButton
      aria-labelledby='modal-title'
      open={visible}
      onClose={closeHandler}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Modal.Header>
            <Text>Agrega a la lista</Text>
          </Modal.Header>
          <Modal.Body>
            {lists.length > 0 ? (
              <>
                <Grid.Container gap={2} justify='center'>
                  <Text color='#4E4B66'>Agrega este podcast a tu lista</Text>
                </Grid.Container>
                <Spacer y={2} />
                <Dropdown>
                  <Dropdown.Button flat>{selectedName}</Dropdown.Button>
                  <Dropdown.Menu
                    aria-label='Dynamic Actions'
                    items={lists}
                    onSelectionChange={setSelectedList}
                    selectedKeys={selectedList}
                    disallowEmptySelection
                    selectionMode='single'
                    css={{
                      maxHeight: '200px',
                      overflow: 'scroll'
                    }}
                  >
                    {lists.map((item) => {
                      return (
                        <Dropdown.Item key={item.key}>
                          {item.name}
                        </Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
              </>
            ) : (
              <Text>
                No tienes listas creadas,{' '}
                <Link href='/dashboard/lists'>¿quieres crear una?</Link>
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
              disabled={isLoading || lists.length < 1}
              color='secondary'
              shadow
              css={{
                zIndex: 1,
              }}
              onClick={() => onAssociatePodcasts()}
            >
              {isLoading ? (
                <Loading type='points' color='currentColor' size='sm' />
              ) : (
                'Agregar'
              )}
            </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  )
}
