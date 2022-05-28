import { useEffect, useState } from 'react'

import Cookies from 'js-cookie'

import { talksUpApi } from '../../api'
import { MetaDataLayout } from '../../components/layouts'
import { PodcastCard } from '../../components/podcast'
import { NavBar } from '../../components/sideBar'

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [podcastList, setPodcastList] = useState([])

  useEffect(() => {
    const fetchPodcasts = async () => {
      const { data } = await talksUpApi.get('/podcasts?lang=ESP', {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setPodcastList(data.data)
      console.log(podcastList)
    }

    fetchPodcasts()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      <NavBar />

      <div style={{ marginTop: '56px', padding: '20px' }}>
        {podcastList.map((podcast) => (
          <PodcastCard
            key={podcast.podcast_id}
            author={podcast.author.name}
            authorID={podcast.author.author_id}
            podcastTitle={podcast.name}
            coverURL={podcast.cover_pic_url}
            totalEpisodes={podcast.total_episodes}
            tags={podcast.categories}
          />
        ))}
      </div>
    </MetaDataLayout>
  )
}
