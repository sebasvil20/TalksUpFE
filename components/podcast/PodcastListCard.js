import { Grid, Container } from '@nextui-org/react'

import { PodcastCard } from './'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'

export const PodcastListCard = ({ podcastList }) => {
  return (
    <Container
      css={{
        position: 'relative',
        width: '100vw',
        padding: '0 12px 0 0!important',
        margin: '0 20px!important',
        maxW: 'calc(96vw - 24px)',
        backgroundColor: 'transparent!important',
      }}
    >
      <Container
        css={{
          position: 'absolute',
          zIndex: '10',
          right: '20px',
          top: '5%',
          width: '10px',
          display: 'flex',
          alignItems: 'center',
          height: '250px',
          '@mdMax': {
            height: '350px',
          },
          '@md': {
            display: 'none',
          },
          color: '#bbbbbb',
        }}
      >
        <ArrowCircleRightIcon />
      </Container>
      <Grid.Container
        gap={2}
        justify='flex-start'
        css={{
          width: '100%',
          overflow: 'scroll',
          position: 'relative',
          backgroundColor: 'transparent!important',
        }}
        wrap='nowrap'
      >
        {podcastList.map((podcast) => (
          <Grid key={podcast.podcast_id}>
            <PodcastCard podcast={podcast} />
          </Grid>
        ))}
      </Grid.Container>
    </Container>
  )
}
