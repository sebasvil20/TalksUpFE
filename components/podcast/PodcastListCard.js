import { Grid } from '@nextui-org/react'
import { PodcastCard } from './'

export const PodcastListCard = ({ podcastList }) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
      {podcastList.map((podcast) => (
        <Grid key={podcast.podcast_id} sm={4} xs={12}>
          <PodcastCard podcast={podcast} />
        </Grid>
      ))}
      </Grid.Container>
  )
}
