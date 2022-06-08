import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import { PodcastListCard } from '../../../components/podcast'
import { Loader } from '../../../components/loader'
import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { talksUpApi } from '../../../api'
import { CategoryCard } from '../../../components/category/CategoryCard'
import { Button, Spacer } from '@nextui-org/react'

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
      <div style={{ display: 'flex', marginTop: '80px', padding: '12px' }}>
        {isLoading ? (
          <Loader />
        ) : (
          <div style={{ margin: 'auto' }}>
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
            <PodcastListCard podcastList={podcastList} />
          </div>
        )}
      </div>
    </MetaDataLayout>
  )
}

export default DetailCategory
