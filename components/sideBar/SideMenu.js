import { useContext } from 'react'

import { Drawer, Box, List } from '@mui/material'
import { Link, Spacer } from '@nextui-org/react'

import ExploreIcon from '@mui/icons-material/Explore'
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver'
import EarbudsIcon from '@mui/icons-material/Earbuds'
import AddBoxIcon from '@mui/icons-material/AddBox'

import { UIContext } from '../../context'
import { LogoHeader } from '../header'
import { UserCard, NavLink } from './'
import Cookies from 'js-cookie'

export const SideMenu = () => {
  const { isMenuOpen, toggleSideMenu } = useContext(UIContext)
  return (
    <Drawer
      onClose={() => toggleSideMenu()}
      open={isMenuOpen}
      anchor='left'
      sx={{ backdropFilter: 'blur(4px)', transition: 'all .5s ease-out' }}
    >
      <Box
        sx={{
          width: 250,
          height: '100vh',
          paddingTop: 5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Link href='/dashboard'>
          <LogoHeader witdh={150} />
        </Link>
        <List>
          <NavLink href={'/dashboard'} icon={<ExploreIcon />}>
            Dashboard
          </NavLink>
          <NavLink href={'/dashboard/artists'} icon={<RecordVoiceOverIcon />}>
            Artistas
          </NavLink>
          <NavLink href={'/dashboard/lists'} icon={<EarbudsIcon />}>
            Listas
          </NavLink>
          {Cookies.get('role') == '1' && (
            <>
              <Spacer />
              <hr />
              <NavLink href={'/dashboard/admin'} icon={<AddBoxIcon />}>
                Admin
              </NavLink>
            </>
          )}
        </List>
        <UserCard />
      </Box>
    </Drawer>
  )
}
