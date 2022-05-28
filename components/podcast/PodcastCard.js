import { Card, Col, Row, Button, Text, Link } from '@nextui-org/react'

export const PodcastCard = ({
  author,
  authorID,
  podcastTitle,
  coverURL,
  totalEpisodes,
  tags,
}) => {
  return (
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
              href={`dashboard/artists/${authorID}`}
            >
              {author}
            </Link>
          </Text>
          <Text h3 color='white'>
            {podcastTitle}
          </Text>
        </Col>
      </Card.Header>
      <Card.Body>
        <Card.Image
          src={coverURL}
          height={400}
          width='100%'
          alt='Relaxing app background'
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
                  src={coverURL}
                  css={{ background: 'black' }}
                  height={40}
                  width={40}
                  alt='Breathing app icon'
                />
              </Col>
              <Col css={{ paddingLeft: '10px' }}>
                <Text color='#d1d1d1' size={12}>
                  {totalEpisodes} espisodes
                </Text>
                <Text color='#d1d1d1' size={12}>
                  History, War, Strategy, Society
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
  )
}
