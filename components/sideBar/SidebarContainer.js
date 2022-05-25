import { Container, Link, useTheme, Loading } from '@nextui-org/react'

import { LogoHeader } from '../header'
import { UserCard, LinkList } from './'

export const SidebarContainer = () => {
  const { theme } = useTheme()
  return (
    <Container
      style={{
        width: '300px',
        boxShadow: '2px 0px 13px 0px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'sticky',
        top: '0',
        left: '0',
        height: '100vh',
        maxHeight: '100vh',
        minHeight: '100vh',
        margin: '0px 20px 0px 0px',
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
