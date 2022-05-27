import { useContext } from 'react'

import { User, Grid, Container, Link } from '@nextui-org/react'

import { AuthContext } from '../../context'
import { ThemeSwitcher } from '../themeConfig'

export const UserCard = () => {
  const { user } = useContext(AuthContext)

  return (
    <Container style={{ width: '100%', textAlign: 'center' }}>
      <Grid>
        <Link href='/dashboard/user'>
          <User
            bordered
            src={
              user?.profile_pic_url
                ? user.profile_pic_url
                : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
            }
            name={`${user?.first_name} ${user?.last_name} `}
            color='secondary'
          />
        </Link>
        <ThemeSwitcher customStyle={{ margin: '0px 10px' }} />
      </Grid>
    </Container>
  )
}
