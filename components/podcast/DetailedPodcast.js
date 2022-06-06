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
} from '@nextui-org/react'
import Rating from '@mui/material/Rating'

export const DetailedPodcast = ({ podcast }) => {
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
      <Text css={{ '@smMax': { textAlign: 'center' }, padding: '12px' }}>
        <Text b size={26}>
          {name}
          {lang_id && (lang_id == 'ESP' ? ' 🇪🇸' : ' 🇺🇸')}
        </Text>
      </Text>
      <Spacer />
      <Grid.Container gap={2}>
        <Grid xs={12} sm={2}>
          <Image
            src={
              cover_pic_url
                ? cover_pic_url
                : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/f4435d00-e1e5-11ec-9f43-acde48001122.png'
            }
            alt='Cover podcast image'
          />
        </Grid>
        <Grid xs={12} sm={10} direction='column' justify='center'>
          <Text b size={18}>
            Descripción
          </Text>
          <Text>{description}</Text>
          <Text>
            By <Link href={`/artists/${author.author_id}`}>{author.name}</Link>
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

      <Grid.Container gap={2} justify='center'>
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
          <Grid xs={6} sm={3} direction='column'>
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
          <Grid xs={6} sm={3} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Fecha lanzamiento
            </Text>
            <Text>{release_date}</Text>
          </Grid>
        )}
        {update_date && (
          <Grid xs={6} sm={3} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Última fecha actualización
            </Text>
            <Text>{update_date}</Text>
          </Grid>
        )}
        {total_episodes && (
          <Grid xs={6} sm={3} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Cantidad de episodios
            </Text>
            <Text>{total_episodes}</Text>
          </Grid>
        )}
        {total_length && (
          <Grid xs={6} sm={3} direction='column'>
            <Text css={{ marginTop: '10px' }} b size={18}>
              Longitud total
            </Text>
            <Text>{total_length}</Text>
          </Grid>
        )}
      </Grid.Container>
    </Container>
  )
}
