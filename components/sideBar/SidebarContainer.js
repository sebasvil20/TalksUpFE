import { Container, Link, useTheme, Loading } from '@nextui-org/react'

import { LogoHeader } from '../header'
import { UserCard, LinkList } from './'

export const SidebarContainer = () => {
  const { theme } = useTheme()
  return (
    <Container
      css={{
        boxShadow: '2px 0px 13px 0px rgba(0,0,0,0.6)',
        display: 'flex',
        maxWidth: '300px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        margin: '0!important',
        padding: '15px',
      }}
    >
      <Link href='/dashboard'>
        <LogoHeader witdh={150} />
      </Link>
      <LinkList />
      <UserCard />
    </Container>
  )
}
