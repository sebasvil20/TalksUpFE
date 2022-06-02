import { useEffect, useState, useContext } from 'react'

import { Grid, Text } from '@nextui-org/react'

import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { PodcastCard } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'
import { Loader } from '../../components/loader'

import { AuthContext } from '../../context'

export const MenuLink = ({ text, isActive, onClickFunc }) => {
  const linkStyle = {
    color: isActive ? '#6334EB' : '#A0A3BD',
    cursor: 'pointer',
    '@sm': {
      marginRight: '40px',
    },
  }

  return (
    <Text onClick={onClickFunc} css={linkStyle}>
      {text}
    </Text>
  )
}

const Dashboard = ({ allPodcasts, recommended }) => {
  const { user } = useContext(AuthContext)
  const [hasLikes] = useState(recommended.length > 0)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchForUser, setFetchForUser] = useState(hasLikes)
  const [podcastList, setPodcastList] = useState([])

  useEffect(() => {
    setPodcastList(allPodcasts.slice(0, 3))
    if (hasLikes) {
      setPodcastList(recommended.slice(0, 3))
    }
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
                    setPodcastList(recommended)
                    setFetchForUser(true)
                  }}
                />
              )}
              <MenuLink
                text='Last updated 🕙'
                isActive={!fetchForUser}
                onClickFunc={() => {
                  setPodcastList(allPodcasts)
                  setFetchForUser(false)
                }}
              />
            </Text>
            <Grid.Container gap={2} justify='center'>
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

export const getServerSideProps = async ({ req }) => {
  const { token = '', lang = '', hasLikes = false } = req.cookies
  let recommended = []
  const all = await talksUpApi.get(`/podcasts?lang=${lang}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (hasLikes) {
    recommended = await talksUpApi.get('/podcasts/recommendation', {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
  return {
    props: {
      allPodcasts: all.data.data,
      recommended: recommended?.data?.data,
    },
  }
}

export default Dashboard
