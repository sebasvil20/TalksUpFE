import { useEffect, useState, useContext } from 'react'

import { Text, Spacer, Container } from '@nextui-org/react'
import Cookie from 'js-cookie'

import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { MenuLink, PodcastListCard } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'
import { Loader } from '../../components/loader'
import { AuthContext } from '../../context'
import { CategoryListCard } from '../../components/category'
import { CompleteProfileModal } from '../../components/user/CompleteProfileModal'

const Dashboard = () => {
  const { user } = useContext(AuthContext)
  const [hasLikes] = useState(Cookie.get('hasLikes') == 'true')
  const [isLoading, setIsLoading] = useState(true)
  const [fetchForUser, setFetchForUser] = useState(hasLikes)
  const [podcastList, setPodcastList] = useState([])
  const [showModal, setShowModal] = useState(false)

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
    setPodcastList(all.data.data.slice(0, 8))
    setIsLoading(false)
  }

  useEffect(() => {
    FetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchForUser])

  useEffect(() => {
    setIsLoading(true)
    if (user) {
      setIsLoading(false)
      if (
        (!user?.biography || !user?.likes) &&
        localStorage.getItem(`updateAsked-${Cookie.get('token')}`) != 'true'
      ) {
        setShowModal(true)
      }
    }
  }, [user])

  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      <CompleteProfileModal
        showModal={showModal}
        closeFunc={() => setShowModal(false)}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <NavBar />
          <div
            style={{
              marginTop: '56px',
              padding: '20px',
              background: '#FBFCFF',
            }}
          >
            <Text
              css={{ paddingLeft: '26px', marginTop: '10px', color: '#6E7191' }}
            >
              What&rsquo;s Hot 🔥
            </Text>
            <Text
              css={{ paddingLeft: '24px', marginTop: '2px', color: '#14142B' }}
              h1
            >
              Explorar
            </Text>
            <Container
              css={{
                padding: '0 26px',
                margin: '0',
                display: 'flex',
                justifyContent: 'start',
                '@smMax': { justifyContent: 'space-between' },
              }}
            >
              {hasLikes && (
                <MenuLink
                  text={`Para ti, ${
                    user?.public_name &&
                    (user?.public_name.length > 10
                      ? `${user?.public_name.slice(0, 10)}...`
                      : user?.public_name)
                  } 🎧`}
                  isActive={fetchForUser}
                  onClickFunc={() => {
                    setFetchForUser(true)
                  }}
                />
              )}
              <MenuLink
                text='Ùltimos actualizados 🕙'
                isActive={!fetchForUser}
                onClickFunc={() => {
                  setFetchForUser(false)
                }}
              />
            </Container>
            <PodcastListCard podcastList={podcastList} />
          </div>

          <div style={{ padding: '20px' }}>
            <Text
              css={{ paddingLeft: '24px', marginTop: '2px', color: '#14142B' }}
              h2
            >
              Categorías
            </Text>
            <Spacer />
            <CategoryListCard />
          </div>
        </>
      )}
    </MetaDataLayout>
  )
}

export default Dashboard
