/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Button, Spacer, Grid, Container, Text } from '@nextui-org/react'
import Cookies from 'js-cookie'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { PodcastCard } from '../../../components/podcast'
import { Loader } from '../../../components/loader'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'

const DetailedList = () => {
  const [listInfo, setListInfo] = useState()
  const [podcasts, setPodcasts] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const fetchData = async () => {
      const { data } = await talksUpApi.get(`/lists/${router.query.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setListInfo(data.data)
      setPodcasts(data.data.podcasts)
      setIsLoading(false)
    }

    fetchData()
  }, [router.isReady, router.query.id])

  const deleteList = async () => {
    setIsLoading(true)
    try {
      const resp = await talksUpApi.delete(`/lists/${listInfo?.list_id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      router.push('/dashboard/lists')
    } catch (error) {
      setIsLoading(false)
    }
  }

  return (
    <MetaDataLayout
      title={isLoading ? 'TalksUp' : `TalksUp - ${listInfo?.name}`}
    >
      <NavBar />
      {isLoading ? (
        <Loader />
      ) : (
        <div
          style={{
            width: '80%',
            margin: '80px auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
            borderRadius: '30px',
            backgroundColor: '#ffffff',
          }}
        >
          <Spacer />
          <Button
            onClick={() => router.push('/dashboard/lists')}
            css={{
              margin: 'auto',
              background: 'transparent',
              color: '#6E7191',
            }}
          >
            ← Volver al listado
          </Button>
          <Spacer />
          {listInfo?.user_id == Cookies.get('user_id') && (
            <>
              <Button
                color='error'
                disabled={isLoading}
                css={{
                  margin: 'auto',
                }}
                icon={<DeleteForeverIcon fill='currentColor' />}
                onPress={() => deleteList()}
              >
                Eliminar Lista
              </Button>
              <Spacer />
            </>
          )}
          <Container
            css={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div style={{ width: '100%', height: '100px' }}>
              <img
                onError={(e) =>
                  (e.target.src =
                    'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/e62a90e2-f1e6-11ec-93de-acde48001122.png')
                }
                src={
                  listInfo.cover_pic_url
                    ? listInfo.cover_pic_url
                    : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/e62a90e2-f1e6-11ec-93de-acde48001122.png'
                }
                alt={listInfo.name}
                style={{
                  borderRadius: '10px',
                  width: '100%',
                  height: '100px',
                  position: 'relative',
                  zIndex: '1',
                }}
              />
            </div>
            <img
              onError={(e) =>
                (e.target.src =
                  'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/b5d288fc-f1e4-11ec-89f4-acde48001122.png')
              }
              src={
                listInfo.icon_url
                  ? listInfo.icon_url
                  : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/b5d288fc-f1e4-11ec-89f4-acde48001122.png'
              }
              alt={listInfo.name}
              width='100px'
              height='100px'
              style={{
                width: '100px',
                height: '100px',
                marginTop: '-50px',
                borderRadius: '10px',
                position: 'relative',
                zIndex: '99',
              }}
            />

            <Text
              h1
              color='#14142B'
              css={{ maxWidth: '100%', wordBreak: 'break-word' }}
            >
              {listInfo.name}
            </Text>
            {listInfo.description && (
              <Text color='#6E7191'>{listInfo.description}</Text>
            )}
          </Container>
          <Grid.Container
            gap={2}
            justify='center'
            css={{ m: '0!important' }}
            wrap='wrap'
          >
            {podcasts?.length > 0 ? (
              podcasts.map((podcast) => (
                <Grid key={podcast.podcast_id}>
                  <PodcastCard podcast={podcast} />
                </Grid>
              ))
            ) : (
              <Grid xs={12} justify='center'>
                <Text
                  color='#6e7191'
                  size={22}
                  css={{ textAlign: 'center', paddingTop: '70px' }}
                >
                  No hay podcast en esta lista. Si es tuya puedes agregar más
                </Text>
              </Grid>
            )}
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default DetailedList
