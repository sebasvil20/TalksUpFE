import { Card, Col, Row, Text, Link, Grid, Image } from '@nextui-org/react'
import { CategoryPill } from '../category'

export const PodcastCard = ({ podcast }) => {
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
    <>
      <Card
        isHoverable
        css={{
          w: '460px',
          minWidth: '460px',
          height: '250px',
          '@mdMax': {
            w: '350px',
            minWidth: '350px',
            height: '350px',
            overflow: 'hidden',
          },
          borderRadius: '32px',
          p: '10px',
        }}
      >
        <Card.Body>
          <Grid.Container css={{ height: '250px' }} gap={2}>
            <Grid
              md={4}
              xs={12}
              alignContent='center'
              alignItems='center'
              justify='center'
            >
              <Link href={`/dashboard/podcast/${podcast_id}`}>
                <Image
                  showSkeleton
                  maxDelay={3000}
                  src={
                    cover_pic_url
                      ? cover_pic_url
                      : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/f4435d00-e1e5-11ec-9f43-acde48001122.png'
                  }
                  css={{ borderRadius: '20px' }}
                  height='150px'
                  width='150px'
                  alt={`${name} icon`}
                />
              </Link>
            </Grid>
            <Grid
              xs={12}
              md={8}
              alignContent='center'
              alignItems='center'
              justify='center'
              direction='column'
            >
              <Col
                css={{
                  '@mdMax': {
                    textAlign: 'center',
                  },
                }}
              >
                <Text
                  size={12}
                  weight='bold'
                  transform='uppercase'
                  color='#B7B7B7'
                >
                  By {author.name}
                </Text>
                <Link
                  href={`/dashboard/podcast/${podcast_id}`}
                  css={{
                    maxW: '250px',
                    fontSize: '22px',
                    color: '#14142B',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    '@mdMax': {
                      fontSize: '20px',
                      maxW: '250px',
                      textAlign: 'center',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    },
                  }}
                >
                  {name}
                </Link>
              </Col>
              <Row
                css={{
                  '@mdMax': {
                    justifyContent: 'center',
                  },
                }}
              >
                <Text
                  color='#989898'
                  size={14}
                  css={{
                    mr: '15px',
                    '@mdMax': {
                      fontSize: '14px',
                      textAlign: 'center',
                    },
                  }}
                >
                  &#128336; {total_length}
                </Text>
                <Text
                  color='#989898'
                  size={14}
                  css={{
                    '@mdMax': {
                      fontSize: '12px',
                      textAlign: 'center',
                    },
                  }}
                >
                  &#10133; {total_episodes} episodios
                </Text>
              </Row>
              <Row
                css={{
                  display: 'flex',
                  w: '100%',
                  flexWrap: 'wrap',
                  mw: '280px',
                  alignContent: 'left',

                  '@mdMax': {
                    justifyContent: 'center',
                  },
                }}
              >
                {categories &&
                  categories
                    .slice(0, 2)
                    .map((tag) => (
                      <CategoryPill
                        key={tag.category_id}
                        name={tag.name}
                        id={tag.category_id}
                      />
                    ))}
              </Row>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </>
  )
}
