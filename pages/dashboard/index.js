import { useEffect, useState, useContext } from 'react'

import { Grid, Text } from '@nextui-org/react'
import Cookies from 'js-cookie'

import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { PodcastCard } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'
import { Loader } from '../../components/loader'

import { AuthContext } from '../../context'

import React from 'react'

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

export default function Dashboard() {
  const { user } = useContext(AuthContext)
  const [hasLikes] = useState(user?.likes?.length > 0)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchForUser, setFetchForUser] = useState(hasLikes)
  const [podcastList, setPodcastList] = useState([])

  const fetchPodcasts = async (forUser) => {
    const url = forUser
      ? '/podcasts/recommendation'
      : `/podcasts?lang=${user.lang}`
    const { data } = await talksUpApi.get(url, {
      headers: { Authorization: `Bearer ${Cookies.get('token')}` },
    })
    setPodcastList(data.data.slice(0, 3))
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPodcasts(fetchForUser)
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
                  text='For you 🎧'
                  isActive={fetchForUser}
                  onClickFunc={() => setFetchForUser(true)}
                />
              )}
              <MenuLink
                text='Last updated 🕙'
                isActive={!fetchForUser}
                onClickFunc={() => setFetchForUser(false)}
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
