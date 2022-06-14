import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import { PodcastCard } from '../../../components/podcast'
import { Loader } from '../../../components/loader'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { Button, Spacer, Grid, Container, Text, Image } from '@nextui-org/react'

const DetailCategory = () => {
  const [podcastList, setPodcastList] = useState([])
  const [category, setCategory] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const fetchData = async () => {
        const podcastList = await talksUpApi.get(
          `/podcasts?category_id=${router.query.id}`,
          {
            headers: { Authorization: `Bearer ${Cookies.get('token')}` },
          }
        )
        const catInfo = await talksUpApi.get(`/categories/${router.query.id}`)
        setPodcastList(podcastList.data.data)
        setCategory(catInfo.data.data)
        setIsLoading(false)
      }

      fetchData()
    }
  }, [router.isReady, router.query.id])

  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp -`}>
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
            onClick={() => router.push('/dashboard')}
            css={{
              margin: 'auto',
              background: 'transparent',
              color: '#6E7191',
            }}
          >
            ← Volver al dashboard
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
                3(
                  (e.target.src =
                    'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
                )
              }
              src={
                category.icon_url
                  ? category.icon_url
                  : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
              }
              alt={category.name}
              css={{ size: '100px' }}
            />
            <Text h1 color='#14142B'>
              {category.name}
            </Text>
            <Text color='#6E7191'>{category.description}</Text>
          </Container>
          <Grid.Container
            gap={2}
            justify='center'
            css={{ m: '0!important' }}
            wrap='wrap'
          >
            {podcastList.map((podcast) => (
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

export default DetailCategory
