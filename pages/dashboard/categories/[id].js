import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import { PodcastListCard, PodcastCard } from '../../../components/podcast'
import { Loader } from '../../../components/loader'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { CategoryCard } from '../../../components/category/CategoryCard'
import { Button, Spacer, Grid } from '@nextui-org/react'

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
      <div style={{ display: 'flex', marginTop: '80px', width: '100%' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <div style={{ margin: 'auto'}}>
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
            <CategoryCard
              category={category}
              showLink={false}
              clickable={false}
              margin={false}
            />
            <Spacer />
            <Grid.Container
              gap={2}
              justify='center'
              css={{ width: '100%', m:'0!important' }}
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
      </div>
    </MetaDataLayout>
  )
}

export default DetailCategory
