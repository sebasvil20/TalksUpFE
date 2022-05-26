import { Container } from '@nextui-org/react'
import { SidebarContainer } from '../sideBar'

export const SideBarLayout = ({ children }) => {
  return (
    <Container style={{ display: 'flex', margin: '0', padding: '0' }}>
      <SidebarContainer />

      {children}
    </Container>
  )
}
