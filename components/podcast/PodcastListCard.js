import { Grid } from '@nextui-org/react'

import { PodcastCard } from './'

export const PodcastListCard = ({ podcastList }) => {
  return (
    <Grid.Container gap={2} justify='flex-start' css={{width: '100%', overflow: 'scroll'}} wrap='nowrap' >
      {podcastList.map((podcast) => (
        <Grid key={podcast.podcast_id}>
          <PodcastCard podcast={podcast} />
        </Grid>
      ))}
      </Grid.Container>
  )
}
