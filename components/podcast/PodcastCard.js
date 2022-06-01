import { useRouter } from 'next/router'

import { Card, Col, Row, Button, Text, Link } from '@nextui-org/react'

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
      <Card cover css={{ w: '100%', p: 0, mb: '10px' }}>
        <Card.Header
          blur
          css={{
            position: 'absolute',
            zIndex: 1,
            top: 0,
            bgBlur: '#0f1114',
            borderBottom: '$borderWeights$light solid $gray700',
            zIndex: 1,
          }}
        >
          <Col>
            <Text size={12} weight='bold' transform='uppercase' color='#D6D6D6'>
              By{' '}
              <Link
                css={{ color: '#D6D6D6' }}
                href={`dashboard/artists/${author.author_id}`}
              >
                {author.name}
              </Link>
            </Text>
            <Text h3 color='white'>
              {name}
            </Text>
          </Col>
        </Card.Header>
        <Card.Body>
          <Card.Image
            src={cover_pic_url}
            height={400}
            width='100%'
            alt={`${name} cover image`}
          />
        </Card.Body>
        <Card.Footer
          blur
          css={{
            position: 'absolute',
            bgBlur: '#0f1114',
            borderTop: '$borderWeights$light solid $gray700',
            bottom: 0,
            zIndex: 1,
          }}
        >
          <Row>
            <Col>
              <Row>
                <Col span={3}>
                  <Card.Image
                    src={cover_pic_url}
                    css={{ background: 'black' }}
                    height={40}
                    width={40}
                    alt={`${name} icon`}
                  />
                </Col>
                <Col css={{ paddingLeft: '10px' }}>
                  <Text color='#d1d1d1' size={12}>
                    {total_episodes} espisodes
                  </Text>
                  <Text color='#d1d1d1' size={12}>
                    {categories.map((tag) => (
                      <Link
                        css={{ color: '#D6D6D6' }}
                        key={tag.category_id}
                        href={`/dashboard/categories/${tag.category_id}`}
                      >
                        {tag.name}&nbsp;
                      </Link>
                    ))}
                  </Text>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row justify='flex-end'>
                <Button
                  flat
                  auto
                  rounded
                  css={{ color: '#94f9f0', bg: '#94f9f026' }}
                  onClick={() => {
                    router.push(`/dashboard/podcast/${podcast_id}`)
                  }}
                >
                  <Text
                    css={{ color: 'inherit' }}
                    size={12}
                    weight='bold'
                    transform='uppercase'
                  >
                    View Details
                  </Text>
                </Button>
              </Row>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </>
  )
}
