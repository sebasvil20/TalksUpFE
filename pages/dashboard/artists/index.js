import { useEffect, useState } from 'react'

import { Grid, Text, Pagination, Spacer } from '@nextui-org/react'
import Cookies from 'js-cookie'

import { talksUpApi } from '../../../api'
import { ArtistCard } from '../../../components/artists'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { Loader } from '../../../components/loader'

const AuthorsPage = () => {
  const [artists, setArtists] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      const allAuthors = await talksUpApi.get(`/authors`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })

      setTotalPages(Math.ceil(allAuthors.data.data.length / 8))
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
            {artists
              .slice((currentPage - 1) * 8, (currentPage - 1) * 8 + 8)
              .map(
                (artist) =>
                  artist.total_podcasts > 0 && (
                    <Grid key={artist.author_id} sm={3} xs={6}>
                      <ArtistCard artist={artist} />
                    </Grid>
                  )
              )}

            <Spacer />
            {artists && totalPages > 1 && (
              <Grid xs={12} justify='center'>
                <Pagination
                  shadow
                  color='secondary'
                  page={currentPage}
                  onChange={(page) => setCurrentPage(page)}
                  total={totalPages}
                />
              </Grid>
            )}
          </Grid.Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default AuthorsPage
