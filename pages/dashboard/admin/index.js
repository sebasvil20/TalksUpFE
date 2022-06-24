import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Grid, Text, Button, Spacer } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MetaDataLayout } from '../../../components/layouts'
import { Loader } from '../../../components/loader'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { UserListTable, ArtistListTable } from '../../../components/admin'

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userList, setUserList] = useState([])
  const [artistList, setArtistList] = useState([])
  const router = useRouter()

  const fetchData = async () => {
    const allUsers = await talksUpApi.get(`/users`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setUserList(allUsers.data.data)
  }

  const fetchArtists = async () => {
    const allArtists = await talksUpApi.get(`/authors`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setArtistList(allArtists.data.data)
  }

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (Cookies.get('role') != '1') {
      router.replace('/dashboard')
      return
    }
 
    fetchData()
    fetchArtists()
    setIsLoading(false)
  }, [router, router.isReady])

  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp - Administrador`}>
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
          <Text
            css={{
              paddingLeft: '24px',
              marginTop: '2px',
              color: '#14142B',
            }}
            h1
          >
            Dashboard de administrador
          </Text>
          <Text
            css={{ paddingLeft: '26px', marginTop: '10px', color: '#6E7191' }}
          >
            Revisa metricas importantes y modifica usuarios
          </Text>
          <Spacer />
          <Grid.Container gap={1}>
            <Grid
              xs={12}
              md={6}
              css={{
                display: 'unset!important',
                zIndex: '0!important',
                paddingLeft: '24px',
                marginTop: '2px',
              }}
            >
              <Text
                css={{
                  color: '#14142B',
                }}
                h2
              >
                Lista de usuarios
              </Text>
              <UserListTable users={userList} fetchData={fetchData} />
            </Grid>
            <Grid
              xs={12}
              md={6}
              css={{
                display: 'unset!important',
                zIndex: '0!important',
                paddingLeft: '24px',
                marginTop: '2px',
              }}
            >
              <Text
                css={{
                  color: '#14142B',
                }}
                h2
              >
                Lista de artistas
              </Text>
              <ArtistListTable artists={artistList} fetchData={fetchArtists} />
            </Grid>
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default AdminPage
