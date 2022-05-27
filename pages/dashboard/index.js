import { MetaDataLayout } from '../../components/layouts'
import { NavBar, SideMenu } from '../../components/sideBar'

export default function Dashboard() {
  return (
    <MetaDataLayout title='TalksUp - Dashboard'>
      <NavBar />
      <SideMenu />
    </MetaDataLayout>
  )
}
