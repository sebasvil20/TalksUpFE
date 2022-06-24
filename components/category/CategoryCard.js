import Image from 'next/image'
import { useRouter } from 'next/router'

import { Card, Grid, Loading, Text } from '@nextui-org/react'
import { useEffect, useState } from 'react'

export const CategoryCard = ({ category, clickable = true, margin = true }) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const { category_id, name, icon_url, description, total_podcasts } = category

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    setIsLoading(false)
  }, [router, router.isReady])

  return (
    <>
      {isLoading ? (
        <Card
          css={{ p: '$6', m: margin ? '5px' : 'auto', w: '100%', h: '100%' }}
          isPressable={clickable}
          isHoverable
        >
          <Loading type='points' size='sm' />{' '}
        </Card>
      ) : (
        <Card
          css={{ p: '$6', m: margin ? '5px' : 'auto', w: '100%', h: '100%' }}
          isPressable={clickable}
          isHoverable
          onPress={() => router.push(`/dashboard/categories/${category_id}`)}
          onClick={() => router.push(`/dashboard/categories/${category_id}`)}
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
                  src={
                    icon_url
                      ? icon_url
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
                <Text
                  css={{ color: '$accents8', '@xsMax': { fontSize: '14px' } }}
                >
                  {total_podcasts} Podcasts
                </Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Body css={{ py: '$2', '@mdMax': { textAlign: 'center' } }}>
            <Text
              css={{
                color: '$accents9',
                '@xsMax': {
                  fontSize: '14px',
                },
              }}
            >
              {description.length > 50
                ? `${description.slice(0, 50)}...`
                : description}
            </Text>
          </Card.Body>
        </Card>
      )}
    </>
  )
}
