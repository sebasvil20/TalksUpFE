import { useState, useContext } from 'react'
import { useRouter } from 'next/router'

import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import ExploreIcon from '@mui/icons-material/Explore'

import { UIContext } from '../../context'

export const NavLink = ({ children, href, icon }) => {
  const [isServer, setIsServer] = useState(true)
  const { toggleSideMenu } = useContext(UIContext)
  const isCurrent = () => {
    return router.pathname === href
  }

  const redirectTo = () => {
    toggleSideMenu()
    router.push(href)
  }
  const router = useRouter()
  return (
    <ListItem
      button
      style={{
        backgroundColor: isCurrent() ? '#efefef' : '',
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText onClick={() => redirectTo()}> {children} </ListItemText>
    </ListItem>
  )
}
