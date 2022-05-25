import { Container } from '@nextui-org/react'

import { NavLink } from './NavLink'

export const LinkList = () => {
  var listOfLinks = [
    {
      name: 'Discover',
      linkTo: '/dashboard',
    },
    {
      name: 'Artists',
      linkTo: '/byArtist',
    },
    {
      name: 'Lists',
      linkTo: '/lists',
    },
    {
      name: 'Contribute',
      linkTo: '/contribute',
    },
  ]

  return (
    <Container
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {listOfLinks.map((link) => (
        <NavLink key={link.linkTo} href={link.linkTo}>
          <a>{link.name}</a>
        </NavLink>
      ))}
    </Container>
  )
}
