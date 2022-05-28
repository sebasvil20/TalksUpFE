import { useContext } from 'react'

import {
  AppBar,
  Button,
  Toolbar,
  Input,
  InputAdornment,
  IconButton,
} from '@mui/material'
import { SearchOutlined } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'

import { UIContext } from '../../context'
import { SideMenu } from './'

export const NavBar = () => {
  const { toggleSideMenu } = useContext(UIContext)
  return (
    <>
      <AppBar style={{ backgroundColor: '#F7F7FC' }}>
        <Toolbar>
          <Button onClick={() => toggleSideMenu()}>
            <MenuIcon style={{ color: '#6334EB' }} />
          </Button>
          <Input
            type='text'
            placeholder='Buscar...'
            style={{ margin: 'auto' }}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle'>
                  <SearchOutlined />
                </IconButton>
              </InputAdornment>
            }
          />
        </Toolbar>
      </AppBar>
      <SideMenu />
    </>
  )
}
