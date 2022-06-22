import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'
import { Grid, Text, Button } from '@nextui-org/react'

import { talksUpApi } from '../../../api'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { Loader } from '../../../components/loader'
import { CreateListModal, ListCard } from '../../../components/lists'

const ListsPage = () => {
  const [showCreateListModal, setShowCreateListModal] = useState(false)
  const [lists, setLists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const fetchData = async () => {
    const allLists = await talksUpApi.get(`/lists`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setLists(allLists.data.data)
    setIsLoading(false)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp - Listas`}>
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            marginTop: '56px',
            padding: '20px',
            background: '#FBFCFF',
          }}
        >
          <Grid.Container>
            <Grid
              xs={12}
              justify='space-between'
              alignContent='center'
              alignItems='center'
            >
              <Text
                css={{
                  paddingLeft: '24px',
                  marginTop: '2px',
                  color: '#14142B',
                }}
                h1
              >
                Listas
              </Text>
              <Button
                rounded
                css={{ minWidth: '200px' }}
                onPress={() => setShowCreateListModal(true)}
                onClick={() => setShowCreateListModal(true)}
              >
                Crear lista
              </Button>
              <CreateListModal
                closeHandler={() => setShowCreateListModal(false)}
                visible={showCreateListModal}
                fetchData={() => fetchData()}
              />
            </Grid>
          </Grid.Container>
          <Text
            css={{ paddingLeft: '26px', marginTop: '10px', color: '#6E7191' }}
          >
            Listas de podcasts creadas por nuestros usuarios
          </Text>
          <Grid.Container gap={2} justify='center'>
            {lists.map((list) => (
              <Grid key={list.list_id} md={3} sm={6} xs={12}>
                <ListCard
                  list={list}
                  fetchData={() => fetchData()}
                  isLoading={isLoading}
                />
              </Grid>
            ))}
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default ListsPage
