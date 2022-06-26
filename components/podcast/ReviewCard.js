import { useState } from 'react'

import { Rating } from '@mui/material'
import { Spacer, Text, Grid, User, Button } from '@nextui-org/react'
import Cookies from 'js-cookie'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { talksUpApi } from '../../api'
import { useRouter } from 'next/router'
import { ErrorCard } from '../errorCard'

export const ReviewCard = ({ review, user, canRemove }) => {
  const router = useRouter()
  const [errorDeleting, setErrorDeleting] = useState(false)

  const deleteReview = async () => {
    try {
      const resp = await talksUpApi.delete(`/reviews/${review.review_id}`, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      router.reload()
    } catch (error) {
      setErrorDeleting(true)
    }
  }

  return (
    <Grid.Container
      css={{ borderTop: '.5px solid #c5c6d3', paddingTop: '10px' }}
    >
      {errorDeleting && (
        <ErrorCard
          message='No se pudo eliminar'
          title='Intentelo de nuevo'
          show={errorDeleting}
        />
      )}
      <Grid
        xs={12}
        sm={6}
        css={{
          wordBreak: 'break-all',
        }}
      >
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

      <Grid
        xs={12}
        css={{
          wordBreak: 'break-all',
        }}
      >
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
        {canRemove && (
          <Button
            size=''
            color='error'
            icon={<DeleteForeverIcon fill='currentColor' />}
            css={{ marginLeft: '10px' }}
            onPress={() => deleteReview()}
          />
        )}
      </Grid>
    </Grid.Container>
  )
}
