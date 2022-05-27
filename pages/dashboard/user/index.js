import { MetaDataLayout } from '../../../components/layouts'
import { UserResume } from '../../../components/user'
import { SidebarContainer } from '../../../components/sideBar'

const index = () => {
  return (
    <MetaDataLayout title='TalksUp - User Management'>
      <div style={{ display: 'flex' }}>
        <SidebarContainer />
        <UserResume />
      </div>
    </MetaDataLayout>
  )
}

export default index
