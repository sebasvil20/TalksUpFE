import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import { PodcastCard } from '../../../components/podcast'
import { Loader } from '../../../components/loader'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { Button, Spacer, Grid, Container, Text, Image } from '@nextui-org/react'

const DetailedArtist = () => {
  const [artistInfo, setArtistInfo] = useState()
  const [podcasts, setPodcasts] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    const fetchData = async () => {
      const { data } = await talksUpApi.get(`/authors/${router.query.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setArtistInfo(data.data)
      setPodcasts(data.data.podcasts)
      setIsLoading(false)
    }

    fetchData()
  }, [router.isReady, router.query.id])

  return (
    <MetaDataLayout
      title={isLoading ? 'TalksUp' : `TalksUp - ${artistInfo?.name}`}
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
            onClick={() => router.push('/dashboard/artists')}
            css={{
              margin: 'auto',
              background: 'transparent',
              color: '#6E7191',
            }}
          >
            ← Volver al listado
          </Button>
          <Spacer />
          <Container
            css={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <Image
              onError={(e) =>
                (e.target.src =
                  'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
              }
              src={
                artistInfo.profile_pic_url
                  ? artistInfo.profile_pic_url
                  : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
              }
              alt={artistInfo.name}
              css={{ size: '100px' }}
            />
            <Text h1 color='#14142B'>
              {artistInfo.name}
            </Text>
            {artistInfo.biography && (
              <Text color='#6E7191'>{artistInfo.biography}</Text>
            )}
          </Container>
          <Grid.Container
            gap={2}
            justify='center'
            css={{ m: '0!important' }}
            wrap='wrap'
          >
            {podcasts.map((podcast) => (
              <Grid key={podcast.podcast_id}>
                <PodcastCard podcast={podcast} />
              </Grid>
            ))}
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default DetailedArtist
