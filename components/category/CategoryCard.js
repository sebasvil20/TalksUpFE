import Image from 'next/image'
import { useRouter } from 'next/router'

import { Card, Grid, Text, Link } from '@nextui-org/react'

export const CategoryCard = ({ category }) => {
  const router = useRouter()
  const { category_id, name, icon_url, description } = category
  return (
    <Card
      css={{ p: '$6', mw: '400px', m: '5px' }}
      clickable
      onClick={() => router.push(`/dashboard/categories/${category_id}`)}
    >
      <Card.Header>
        <Image
          alt='nextui logo'
          onError={(e) =>
            (e.target.src =
              'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
          }
          src={
            icon_url
              ? icon_url
              : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
          }
          width='50px'
          height='50px'
        />
        <Grid.Container css={{ pl: '$6' }}>
          <Grid xs={12}>
            <Text h4 css={{ lineHeight: '$xs' }}>
              {name}
            </Text>
          </Grid>
        </Grid.Container>
      </Card.Header>
      <Card.Body css={{ py: '$2' }}>
        <Text>{description}</Text>
      </Card.Body>
      <Card.Footer>
        <Link
          icon
          color='primary'
          target='_blank'
          href='https://github.com/nextui-org/nextui'
        >
          Ver podcasts de esta categoria
        </Link>
      </Card.Footer>
    </Card>
  )
}
