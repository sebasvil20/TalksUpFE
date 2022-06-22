import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import {
  Container,
  Spacer,
  Text,
  Grid,
  Link,
  Image,
  Button,
  Avatar,
  Pagination,
} from '@nextui-org/react'
import Rating from '@mui/material/Rating'
import Cookies from 'js-cookie'

import { ReviewCard } from './ReviewCard'
import { ReviewForm } from './ReviewForm'
import { AddToListModal } from '../lists'

export const DetailedPodcast = ({ podcast, reviews }) => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showListModal, setShowListModal] = useState(false)
  const [alreadyReviewed, setAlreadyReviewed] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    if (reviews && reviews.length > 0) {
      setTotalPages(Math.ceil(reviews.length / 2))
      let found = reviews.find(
        (review) => review.user_id == Cookies.get('user_id')
      )
      if (found) {
        setAlreadyReviewed(true)
      }
    }
  }, [reviews])

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
    <Container>
      <Button
        onClick={() => router.push('/dashboard')}
        css={{ margin: 'auto', background: 'transparent', color: '#6E7191' }}
      >
        ← Volver al dashboard
      </Button>

      <Grid.Container>
        <Grid
          xs={12}
          justify='space-between'
          alignContent='center'
          alignItems='center'
        >
          <Text css={{ '@smMax': { textAlign: 'center' }, padding: '12px' }}>
            <Text b size={26}>
              {name}
              {lang_id && (lang_id == 'ESP' ? ' 🇪🇸' : ' 🇺🇸')}
            </Text>
          </Text>{' '}
          <Button
            flat
            color='primary'
            auto
            onPress={() => setShowListModal(true)}
            onClick={() => setShowListModal(true)}
          >
            Listas
          </Button>
          <AddToListModal
            closeHandler={() => setShowListModal(false)}
            visible={showListModal}
            podcastID={podcast_id}
          />
        </Grid>
      </Grid.Container>

      <Grid.Container gap={2}>
        <Grid xs={12} sm={2}>
          <Image
            showSkeleton
            maxDelay={3000}
            src={
              cover_pic_url
                ? cover_pic_url
                : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/f4435d00-e1e5-11ec-9f43-acde48001122.png'
            }
            alt='Cover podcast image'
            css={{ borderRadius: '15px' }}
          />
        </Grid>
        <Grid xs={12} sm={10} direction='column' justify='center'>
          <Text b size={18}>
            Descripción
          </Text>
          <Text>{description}</Text>
          <Text>
            By{' '}
            <Link href={`/dashboard/artists/${author.author_id}`}>
              {author.name}
            </Link>
          </Text>
          {platforms && (
            <>
              <Spacer y={0.5} />
              <Text b>Escuchalo ahora en:</Text>
              <Spacer y={0.2} />
              <Text>
                {platforms.map((platform) => (
                  <Link
                    key={platform.platform_id}
                    href={platform.redirect_url}
                    target='_blank'
                    rel='nofollow noopener noreferrer'
                    css={{ padding: '2px' }}
                  >
                    <Avatar
                      src={platform.logo_url}
                      title={platform.name}
                      alt={`Logo ${platform.name}`}
                      color='primary'
                      bordered
                      squared
                      css={{ cursor: 'pointer' }}
                    />
                  </Link>
                ))}
              </Text>
            </>
          )}
        </Grid>
      </Grid.Container>

      <Grid.Container
        gap={2}
        justify='center'
        css={{ '@smMax': { textAlign: 'center' } }}
      >
        {rating && (
          <Grid xs={6} sm={3} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Rating
            </Text>
            <Text>
              <Rating name='read-only' value={rating} readOnly />
            </Text>
          </Grid>
        )}
        {trailer_url && (
          <Grid xs={6} sm={3} md={2} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Trailer
            </Text>
            <Text>
              <Link
                href={trailer_url}
                target='_blank'
                rel='nofollow noopener noreferrer'
              >
                Click para ir al trailer
              </Link>
            </Text>
          </Grid>
        )}
        {release_date && (
          <Grid xs={6} sm={3} md={2} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Fecha lanzamiento
            </Text>
            <Text>{release_date}</Text>
          </Grid>
        )}
        {update_date && (
          <Grid xs={6} sm={3} md={2} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Última actualización
            </Text>
            <Text>{update_date}</Text>
          </Grid>
        )}
        {total_episodes && (
          <Grid xs={6} sm={3} md={2} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Duración
            </Text>
            <Text>
              {total_episodes && `${total_episodes} Epis. - `}{' '}
              {total_length && total_length}
            </Text>
          </Grid>
        )}
      </Grid.Container>
      <Container css={{ '@md': { maxWidth: '50%', margin: '10px auto' } }}>
        <Spacer y={3} />
        <Grid.Container gap={2}>
          <Grid
            xs={12}
            justify='space-between'
            css={{ flexWrap: 'wrap', '@xsMax': { justifyContent: 'center' } }}
          >
            <Text
              h3
              css={{
                minWidth: '200px',
                '@xsMax': { textAlign: 'center', marginBottom: '10px' },
              }}
            >
              Reviews
            </Text>
            <Button
              rounded
              disabled={alreadyReviewed}
              onPress={() => setShowReviewModal(true)}
              onClick={() => setShowReviewModal(true)}
              css={{ minWidth: '200px' }}
            >
              Agregar Review +
            </Button>
            <ReviewForm
              closeHandler={() => setShowReviewModal(false)}
              visible={showReviewModal}
              podcast_id={podcast_id}
            />
          </Grid>
          <Spacer y={1.5} />

          {reviews && reviews.length > 0 ? (
            reviews
              .slice((currentPage - 1) * 2, (currentPage - 1) * 2 + 2)
              .map((review) => (
                <Grid xs={12} justify='center' key={review.review_id}>
                  <ReviewCard
                    review={review}
                    user={review.user}
                    canRemove={review.user_id == Cookies.get('user_id')}
                  />
                </Grid>
              ))
          ) : (
            <Grid xs={12} justify='center'>
              <Text color='#6e7191' size={22} css={{ textAlign: 'center' }}>
                No hay reviews aun 😢 ¿Quieres sumar la tuya?
              </Text>
            </Grid>
          )}
          {reviews && reviews.length > 2 && (
            <Grid xs={12} justify='center'>
              <Pagination
                shadow
                color='secondary'
                page={currentPage}
                onChange={(page) => setCurrentPage(page)}
                total={totalPages}
              />
            </Grid>
          )}
        </Grid.Container>
      </Container>
    </Container>
  )
}
