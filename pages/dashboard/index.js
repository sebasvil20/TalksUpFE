import { useEffect, useState } from 'react'

import { Grid, Loading, Text } from '@nextui-org/react'
import Cookies from 'js-cookie'

import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { PodcastCard } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [podcastList, setPodcastList] = useState([])

  useEffect(() => {
    const fetchPodcasts = async () => {
      const { data } = await talksUpApi.get('/podcasts?lang=ESP', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setPodcastList(data.data.slice(0, 3))
      setIsLoading(false)
    }

    fetchPodcasts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      {isLoading ? (
        <div style={{ height: '100vh' }}>
          <Loading
            color='secondary'
            css={{
              width: '200px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, 0)',
            }}
          />
        </div>
      ) : (
        <>
          <NavBar />
          <div style={{ marginTop: '56px', padding: '20px' }}>
            <Text
              css={{ paddingLeft: '26px', marginTop: '10px', color: '#6E7191' }}
            >
              What&rsquo;s Hot 🔥
            </Text>
            <Text
              css={{ paddingLeft: '24px', marginTop: '2px', color: '#14142B' }}
              h1
            >
              Explore
            </Text>
            <Text
              css={{ paddingLeft: '26px', marginTop: '0', color: '#6334EB' }}
            >
              Last updated
            </Text>
            <Grid.Container gap={2} justify='center'>
              {podcastList.map((podcast) => (
                <Grid key={podcast.podcast_id} sm={4} xs={12}>
                  <PodcastCard
                    podcast={podcast}
                  />
                </Grid>
              ))}
            </Grid.Container>
          </div>
        </>
      )}
    </MetaDataLayout>
  )
}
