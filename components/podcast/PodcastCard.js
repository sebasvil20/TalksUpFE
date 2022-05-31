import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Link,
  Modal,
  Grid,
} from '@nextui-org/react'
import { useState } from 'react'
import Rating from '@mui/material/Rating'
export const PodcastCard = ({ podcast }) => {
  const [visible, setVisible] = useState(false)
  const handler = () => setVisible(true)
  const closeHandler = () => {
    setVisible(false)
  }
  const {
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
                  onClick={handler}
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
      <Modal
        closeButton
        blur
        width='60%'
        aria-labelledby='modal-title'
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id='modal-title' size={18}>
            <Text b size={18}>
              {name}
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text size={18}>
            <Text b size={18}>
              Descripción
            </Text>
            <Text>{description}</Text>
          </Text>

          <Grid.Container gap={2} justify='center'>
            {rating && (
              <Grid xs={2} direction='column'>
                <Text css={{ marginTop: '10px' }} b size={18}>
                  Rating
                </Text>
                <Text>
                  <Rating name='read-only' value={rating} readOnly />
                </Text>
              </Grid>
            )}
            {trailer_url && (
              <Grid xs={2} direction='column'>
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
            <Grid xs={2} direction='column'>
              <Text css={{ marginTop: '10px' }} b size={18}>
                Release date
              </Text>
              <Text>{release_date}</Text>
            </Grid>
            <Grid xs={2} direction='column'>
              <Text css={{ marginTop: '10px' }} b size={18}>
                Last updated date
              </Text>
              <Text>{update_date}</Text>
            </Grid>
            <Grid xs={2} direction='column'>
              <Text css={{ marginTop: '10px' }} b size={18}>
                Total episodes
              </Text>
              <Text>{total_episodes}</Text>
            </Grid>
            <Grid xs={2} direction='column'>
              <Text css={{ marginTop: '10px' }} b size={18}>
                Total length
              </Text>
              <Text>{total_length}</Text>
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color='error' onClick={closeHandler}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}
