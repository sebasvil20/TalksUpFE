import Image from 'next/image'
import { useRouter } from 'next/router'

import { Card, Grid, Text } from '@nextui-org/react'

export const ArtistCard = ({ artist }) => {
  const router = useRouter()
  const { author_id, name, biography, profile_pic_url, total_podcasts } = artist
  return (
    <Card
      css={{ p: '$6', m: '5px', w: '100%', h: '100%' }}
      isPressable
      isHoverable
      onPress={() => router.push(`/dashboard/artists/${author_id}`)}
      onClick={() => router.push(`/dashboard/artists/${author_id}`)}
    >
      <Card.Header>
        <Grid.Container gap={1.5}>
          <Grid xs={12} md={3} justify='center'>
            <Image
              alt='nextui logo'
              objectFit='cover'
              width={100}
              height={100}
              onError={(e) =>
                (e.target.src =
                  'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
              }
              style={{ borderRadius: '10px' }}
              src={
                profile_pic_url
                  ? profile_pic_url
                  : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
              }
            />
          </Grid>
          <Grid
            xs={12}
            md={9}
            direction='column'
            justify='center'
            css={{ '@mdMax': { textAlign: 'center' } }}
          >
            <Text
              h4
              css={{ lineHeight: '$xs', '@xsMax': { fontSize: '18px' } }}
            >
              {name}
            </Text>
            <Text css={{ color: '$accents8', '@xsMax': { fontSize: '14px' } }}>
              {total_podcasts} Podcasts
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      {biography && (
        <Card.Body css={{ py: '$2', '@mdMax': { textAlign: 'center' } }}>
          <Text
            css={{
              color: '$accents9',
              '@xsMax': {
                fontSize: '14px',
              },
            }}
          >
            {biography.length > 50 ? `${biography.slice(0, 50)}...` : biography}
          </Text>
        </Card.Body>
      )}
    </Card>
  )
}
