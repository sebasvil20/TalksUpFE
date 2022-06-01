import { Container, Spacer, Text, Grid, Link } from '@nextui-org/react'
import Rating from '@mui/material/Rating'

export const DetailedPodcast = ({ podcast }) => {
  const {
    podcast_id,
    author,
    name,
    cover_pic_url,
    total_episodes,
    description,
    trailer_url,
    total_length,
    release_date,
    update_date,
    lang_id,
    rating,
    platforms,
    categories,
  } = podcast

  return (
    <Container>
      <Text b size={26}>
        {name}
      </Text>
      <Spacer />
      <Text size={18}>
        <Text b size={18}>
          Descripción
        </Text>
        <Text>{description}</Text>
      </Text>

      <Grid.Container gap={2} justify='center'>
        {rating && (
          <Grid md sm={6} xs={12} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Rating
            </Text>
            <Text>
              <Rating name='read-only' value={rating} readOnly />
            </Text>
          </Grid>
        )}
        {trailer_url && (
          <Grid md sm={6} xs={12} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Trailer
            </Text>
            <Text>
              <Link
                href={trailer_url}
                target='_blank'
                rel='nofollow noopener noreferrer'
              >
                Click to see trailer
              </Link>
            </Text>
          </Grid>
        )}
        <Grid md sm={6} xs={12} direction='column'>
          <Text css={{ marginTop: '10px' }} b size={18}>
            Release date
          </Text>
          <Text>{release_date}</Text>
        </Grid>
        <Grid md sm={6} xs={12} direction='column'>
          <Text css={{ marginTop: '10px' }} b size={18}>
            Last updated date
          </Text>
          <Text>{update_date}</Text>
        </Grid>
        <Grid md sm={6} xs={12} direction='column'>
          <Text css={{ marginTop: '10px' }} b size={18}>
            Total episodes
          </Text>
          <Text>{total_episodes}</Text>
        </Grid>
        <Grid md sm={6} xs={12} direction='column'>
          <Text css={{ marginTop: '10px' }} b size={18}>
            Total length
          </Text>
          <Text>{total_length}</Text>
        </Grid>
      </Grid.Container>
    </Container>
  )
}
