import { Container, Text } from '@nextui-org/react'

import { MetaDataLayout } from '../../components/layouts'
import { SidebarContainer } from '../../components/sideBar'

export default function Dashboard() {
  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      <Container style={{ display: 'flex', margin: '0', padding: '0' }}>
        <SidebarContainer />
        <Text h1>Bienvenido</Text>
      </Container>
    </MetaDataLayout>
  )
}
