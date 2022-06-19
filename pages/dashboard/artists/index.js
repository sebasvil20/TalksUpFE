import { useEffect, useState } from 'react'
import { Grid, Text } from '@nextui-org/react'

import { talksUpApi } from '../../../api'
import { ArtistCard } from '../../../components/artists'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { Loader } from '../../../components/loader'
import Cookies from 'js-cookie'

const AuthorsPage = () => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      const allAuthors = await talksUpApi.get(`/authors`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setArtists(allAuthors.data.data)
      setIsLoading(false)
    }
    fetchData()
  }, [])
  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp - Artistas`}>
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
            css={{ paddingLeft: '24px', marginTop: '2px', color: '#14142B' }}
            h1
          >
            Artistas
          </Text>
          <Grid.Container gap={2} justify='center'>
            {artists.map(
              (artist) =>
                artist.total_podcasts > 0 && (
                  <Grid key={artist.author_id} sm={3} xs={6}>
                    <ArtistCard artist={artist} />
                  </Grid>
                )
            )}
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default AuthorsPage
