import { Text } from '@nextui-org/react'

import { MetaDataLayout } from '../../components/layouts'
import { SideBarLayout } from '../../components/layouts/SideBarLayout'

export default function Dashboard() {
  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      <SideBarLayout>
        <Text h1>Bienvenido</Text>
      </SideBarLayout>
    </MetaDataLayout>
  )
}
