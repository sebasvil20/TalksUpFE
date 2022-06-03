import { useEffect, useState, useContext } from 'react'

import { Grid, Text } from '@nextui-org/react'
import Cookie from 'js-cookie'
import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { PodcastCard, MenuLink } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'
import { Loader } from '../../components/loader'

import { AuthContext } from '../../context'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [hasLikes] = useState(Cookie.get('hasLikes') == 'true')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchForUser, setFetchForUser] = useState(hasLikes)
  const [podcastList, setPodcastList] = useState([])

  const FetchData = async () => {
    const token = Cookie.get('token')
    if (fetchForUser) {
      const recommended = await talksUpApi.get('/podcasts/recommendation', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setPodcastList(recommended.data.data.slice(0, 3))
      setIsLoading(false)
      return
    }
    const all = await talksUpApi.get(`/podcasts?lang=${Cookie.get('lang')}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    setPodcastList(all.data.data.slice(0, 3))
    setIsLoading(false)
  }

  useEffect(() => {
    FetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchForUser])

  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      {isLoading ? (
        <Loader />
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
              css={{
                paddingLeft: '26px',
                paddingRight: '26px',
                marginTop: '0',
                display: 'flex',
                justifyContent: 'start',
                '@smMax': { justifyContent: 'space-between' },
              }}
            >
              {hasLikes && (
                <MenuLink
                  text={`For you, ${user?.public_name} 🎧`}
                  isActive={fetchForUser}
                  onClickFunc={() => {
                    setFetchForUser(true)
                  }}
                />
              )}
              <MenuLink
                text='Last updated 🕙'
                isActive={!fetchForUser}
                onClickFunc={() => {
                  setFetchForUser(false)
                }}
              />
            </Text>
            <Grid.Container gap={2} justify='flex-start'>
              {podcastList.map((podcast) => (
                <Grid key={podcast.podcast_id} sm={4} xs={12}>
                  <PodcastCard podcast={podcast} />
                </Grid>
              ))}
            </Grid.Container>
          </div>
        </>
      )}
    </MetaDataLayout>
  )
}

export default Dashboard
