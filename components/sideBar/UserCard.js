import { useContext } from 'react'
import { useRouter } from 'next/router'

import { User, Grid, Container, Link } from '@nextui-org/react'
import { Button } from '@mui/material'

import LogoutIcon from '@mui/icons-material/Logout'

import { AuthContext, UIContext } from '../../context'
import { ThemeSwitcher } from '../themeConfig'

export const UserCard = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const { toggleSideMenu } = useContext(UIContext)
  const router = useRouter()

  const logoutAndRedirect = () => {
    logoutUser()
    toggleSideMenu()
    router.push('/')
  }

  return (
    <Container
      style={{ width: '100%', textAlign: 'center' }}
    >
      <Grid>
        <Link href='/dashboard/user'>
          <User
            bordered
            onError={(e) =>
              (e.target.src =
                'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
            }
            src={
              user?.profile_pic_url
                ? user.profile_pic_url
                : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
            }
            name={`${
              user?.first_name &&
              (user?.first_name.length > 10
                ? `${user?.first_name.slice(0, 10)}...`
                : user?.first_name)
            }`}
            color='secondary'
          />
        </Link>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button onClick={() => logoutAndRedirect()}>
            <LogoutIcon />
          </Button>
        </div>
      </Grid>
    </Container>
  )
}
