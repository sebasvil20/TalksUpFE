import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import Cookies from 'js-cookie'

import { MetaDataLayout } from '../../../components/layouts'
import { DetailedPodcast } from '../../../components/podcast'
import { talksUpApi } from '../../../api'
import { NavBar } from '../../../components/sideBar'
import { Loader } from '../../../components/loader'

const DetailPodcast = () => {
  const [podcastInfo, setPodcastInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (router.isReady) {
      const fetchData = async () => {
        const { data } = await talksUpApi.get(`/podcasts/${router.query.id}`, {
          headers: { Authorization: `Bearer ${Cookies.get('token')}` },
        })
        setPodcastInfo(data.data)
        setIsLoading(false)
      }

      fetchData()
    }
  }, [router.isReady, router.query.id])

  return (
    <MetaDataLayout
      title={isLoading ? 'TalksUp' : `TalksUp - ${podcastInfo.name}`}
    >
      <NavBar />
      <div style={{ display: 'flex', marginTop: '80px' }}>
        {isLoading ? <Loader /> : <DetailedPodcast podcast={podcastInfo} />}
      </div>
    </MetaDataLayout>
  )
}

export default DetailPodcast
