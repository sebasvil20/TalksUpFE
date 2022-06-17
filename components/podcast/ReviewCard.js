import { Rating } from '@mui/material'
import { Spacer, Text, Grid, User } from '@nextui-org/react'

export const ReviewCard = ({ review, user }) => {
  return (
    <Grid.Container css={{ borderTop: '.5px solid #c5c6d3' }}>
      <Spacer y={1.2} />
      <Grid xs={12} justify='space-between'>
        <Text h4>{review.title}</Text>
        <Rating value={review.rate} readOnly />
      </Grid>
      <Spacer />
      <Grid xs={12}>
        <Text>{review.review}</Text>
      </Grid>
      <Spacer y={1.5} />
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
