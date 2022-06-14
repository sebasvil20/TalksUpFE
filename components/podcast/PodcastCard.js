import { useRouter } from 'next/router'

import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Link,
  Grid,
  Image,
} from '@nextui-org/react'
import { CategoryPill } from '../category'

export const PodcastCard = ({ podcast }) => {
  const router = useRouter()
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
          w: '450px',
          minWidth: '450px',
          height: '250px',
          borderRadius: '32px',
          p: '10px',
        }}
      >
        <Card.Body>
          <Grid.Container css={{ height: '250px' }}>
            <Grid xs={4} alignContent='center' alignItems='center'>
              <Link href={`/dashboard/podcast/${podcast_id}`}>
                <Image
                  src={
                    cover_pic_url
                      ? cover_pic_url
                      : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/f4435d00-e1e5-11ec-9f43-acde48001122.png'
                  }
                  css={{ background: 'black', borderRadius: '20px' }}
                  height='150px'
                  width='150px'
                  alt={`${name} icon`}
                />
              </Link>
            </Grid>
            <Grid
              xs={8}
              alignContent='center'
              alignItems='center'
              justify='center'
              direction='column'
              css={{ pl: '25px' }}
            >
              <Col>
                <Text
                  size={12}
                  weight='bold'
                  transform='uppercase'
                  color='#D6D6D6'
                >
                  By{' '}
                  <Link
                    css={{ color: '#B7B7B7' }}
                    href={`dashboard/artists/${author.author_id}`}
                  >
                    {author.name}
                  </Link>
                </Text>
                <Link
                  href={`/dashboard/podcast/${podcast_id}`}
                  css={{
                    maxW: '250px',
                    fontSize: '24px',
                    color: '#14142B',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    '@smMax': {
                      fontSize: '20px',
                    },
                  }}
                >
                  {name}
                </Link>
              </Col>
              <Row>
                <Text
                  color='#989898'
                  size={16}
                  css={{
                    mr: '15px',
                    '@smMax': {
                      fontSize: '14px',
                    },
                  }}
                >
                  &#128336; {total_length}
                </Text>
                <Text
                  color='#989898'
                  size={16}
                  css={{
                    '@smMax': {
                      fontSize: '14px',
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
                }}
              >
                {categories &&
                  categories.map((tag) => (
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
