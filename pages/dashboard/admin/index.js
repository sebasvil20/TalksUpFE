import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { Grid, Text, Button, Spacer } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { MetaDataLayout } from '../../../components/layouts'
import { Loader } from '../../../components/loader'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { UserListTable } from '../../../components/admin'

const AdminPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [userList, setUserList] = useState([])
  const router = useRouter()

  const fetchData = async () => {
    const allUsers = await talksUpApi.get(`/users`, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setUserList(allUsers.data.data)
    setIsLoading(false)
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

          <Text
            css={{
              paddingLeft: '24px',
              marginTop: '2px',
              color: '#14142B',
            }}
            h2
          >
            Lista de usuarios
          </Text>
          <Grid.Container>
            <Grid xs={6} css={{display:'unset!important', zIndex: '0!important'}}>
              <UserListTable users={userList} fetchData={fetchData}/>
            </Grid>
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default AdminPage
