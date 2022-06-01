import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { Loading } from '@nextui-org/react'
import Cookies from 'js-cookie'

import { MetaDataLayout } from '../../../components/layouts'
import { NavBar } from '../../../components/sideBar'
import { DetailedPodcast } from '../../../components/podcast'
import { talksUpApi } from '../../../api'

const DetailPodcast = () => {
  const [podcastInfo, setPodcastInfo] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { query } = useRouter()
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await talksUpApi.get(`/podcasts/${query.id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setPodcastInfo(data.data)
      setIsLoading(false)
    }

    fetchData()
  }, [query])

  return (
    <MetaDataLayout
      title={isLoading ? 'TalksUp' : `TalksUp - ${podcastInfo.name}`}
    >
      <NavBar />
      <div style={{ display: 'flex', marginTop: '80px' }}>
        {isLoading ? <Loading /> : <DetailedPodcast podcast={podcastInfo} />}
      </div>
    </MetaDataLayout>
  )
}

export default DetailPodcast
