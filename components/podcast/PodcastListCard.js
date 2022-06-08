import { Grid } from '@nextui-org/react'
import { PodcastCard } from './'

export const PodcastListCard = ({ podcastList }) => {
  return (
    <>
      {podcastList.map((podcast) => (
        <Grid key={podcast.podcast_id} sm={4} xs={12}>
          <PodcastCard podcast={podcast} />
        </Grid>
      ))}
    </>
  )
}
