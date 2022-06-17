import { Rating } from '@mui/material'
import { Spacer, Text, Grid, User } from '@nextui-org/react'

export const ReviewCard = ({ review, user }) => {
  return (
    <Grid.Container
      css={{ borderTop: '.5px solid #c5c6d3', paddingTop: '10px' }}
    >
      <Grid xs={12} sm={6}>
        <Text h4>{review.title}</Text>
      </Grid>

      <Grid
        xs={12}
        sm={6}
        css={{
          justifyContent: 'flex-end',
          '@smMax': { justifyContent: 'flex-start' },
        }}
      >
        <Rating value={review.rate} readOnly />
      </Grid>

      <Spacer />

      <Grid xs={12}>
        <Text>{review.review}</Text>
      </Grid>

      <Spacer y={1.3} />
      <Grid xs={12}>
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
      </Grid>
    </Grid.Container>
  )
}
