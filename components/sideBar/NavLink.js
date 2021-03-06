import { useContext } from 'react'
import { useRouter } from 'next/router'

import { ListItem, ListItemIcon, ListItemText } from '@mui/material'

import { UIContext } from '../../context'

export const NavLink = ({ children, href, icon }) => {
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
      onClick={() => redirectTo()}
    >
      <ListItemIcon
        style={{
          color: isCurrent() ? '#6334EB' : '',
        }}
      >
        {icon}
      </ListItemIcon>
      <ListItemText
        style={{
          color: isCurrent() ? '#6334EB' : '',
        }}
      >
        {' '}
        {children}{' '}
      </ListItemText>
    </ListItem>
  )
}
