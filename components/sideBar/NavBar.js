import { useContext } from 'react'

import { AppBar, Button, Toolbar } from '@mui/material'

import { UIContext } from '../../context'

export const NavBar = () => {
  const { toggleSideMenu } = useContext(UIContext)
  return (
    <AppBar style={{ backgroundColor: '#F7F7FC' }}>
      <Toolbar>
        <Button onClick={() => toggleSideMenu()}>Menú</Button>
      </Toolbar>
    </AppBar>
  )
}
