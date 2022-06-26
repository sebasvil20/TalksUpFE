import Image from 'next/image'

import Cookies from 'js-cookie'
import { Card, Grid, Text, Button, User } from '@nextui-org/react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { talksUpApi } from '../../api'
import Link from 'next/link'
import { useState } from 'react'

export const ListCard = ({ list, fetchData, isLoading }) => {
  const [loadingLike, setLoadingLike] = useState(false)

  const {
    list_id,
    icon_url,
    name,
    description,
    likes,
    likes_ids,
    total_podcasts,
    user,
  } = list
  return (
    <Card css={{ p: '$6', m: '5px', w: '100%', h: '100%' }} isHoverable>
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
                  'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/b5d288fc-f1e4-11ec-89f4-acde48001122.png')
              }
              style={{ borderRadius: '10px' }}
              src={
                icon_url
                  ? icon_url
                  : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/b5d288fc-f1e4-11ec-89f4-acde48001122.png'
              }
            />
          </Grid>
          <Grid
            xs={12}
            md={8}
            direction='column'
            justify='center'
            css={{ '@mdMax': { textAlign: 'center' } }}
          >
            <Link href={`/dashboard/lists/${list_id}`}>
              <Text
                h4
                css={{
                  lineHeight: '$xs',
                  '@xsMax': { fontSize: '18px' },
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                }}
              >
                {name}
              </Text>
            </Link>
            <Text css={{ color: '$accents8', '@xsMax': { fontSize: '14px' } }}>
              {total_podcasts} Podcasts
            </Text>
          </Grid>
          <Grid
            md={1}
            xs={12}
            direction='column'
            justify='center'
            alignContent='center'
            alignItems='center'
            css={{ '@mdMax': { flexDirection: 'row' } }}
          >
            <Button
              light
              color='error'
              size=''
              rounded
              animated={false}
              disabled={isLoading || loadingLike}
              onClick={async () => {
                setLoadingLike(true)
                let body = JSON.stringify({
                  list_id: list_id,
                  user_id: Cookies.get('user_id'),
                })
                await talksUpApi.post('/lists/like', body, {
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                })
                fetchData()
                setLoadingLike(false)
              }}
            >
              {likes_ids?.includes(Cookies.get('user_id')) ? (
                <FavoriteIcon
                  style={{ color: `${loadingLike ? '#9c9c9c' : '#FF3F3F'}` }}
                />
              ) : (
                <FavoriteBorderIcon
                  style={{ color: `${loadingLike ? '#9c9c9c' : '#FF3F3F'}` }}
                />
              )}
            </Button>
            {likes}
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2', '@mdMax': { textAlign: 'center' } }}>
        {description && (
          <Card.Body css={{ py: '$2', '@mdMax': { textAlign: 'center' } }}>
            <Text
              css={{
                color: '$accents9',
                '@xsMax': {
                  fontSize: '14px',
                },
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {description.length > 50
                ? `${description.slice(0, 50)}...`
                : description}
            </Text>
          </Card.Body>
        )}
      </Card.Body>
      <Card.Footer css={{ '@mdMax': { justifyContent: 'center' } }}>
        <User
          onError={(e) =>
            (e.target.src =
              'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
          }
          src={
            user?.profile_pic_url
              ? user.profile_pic_url
              : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
          }
          name={user.public_name}
        />
      </Card.Footer>
    </Card>
  )
}
