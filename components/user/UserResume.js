import React from 'react'
import { Image, Text, Grid } from '@nextui-org/react'
import { useContext } from 'react'

import { AuthContext } from '../../context'
export const UserResume = () => {
  const { user } = useContext(AuthContext)
  return (
    <Grid.Container
      gap={2}
      justify='center'
      alignItems='center'
      alignContent='center'
      css={{ maxHeight: '100vh', overflow: 'scroll' }}
    >
      <Grid xs={12} md={2}>
        <Image
          alt='user pfp img'
          src={
            user?.profile_pic_url
              ? user.profile_pic_url
              : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
          }
        />
      </Grid>
      <Grid
        xs={12}
        md={10}
        direction='column'
        css={{ textAlign: 'center', '@md': { textAlign: 'left' } }}
      >
        <Text h6> Hi! 🤩 {user?.public_name}</Text>
        <Text h1>
          {user?.first_name} {user?.last_name}
        </Text>
        {user?.biography && <Text h4>{user?.biography} 😁</Text>}
      </Grid>
    </Grid.Container>
  )
}
