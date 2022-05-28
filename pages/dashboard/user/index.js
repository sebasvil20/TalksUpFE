import { MetaDataLayout } from '../../../components/layouts'
import { UserResume } from '../../../components/user'
import { NavBar } from '../../../components/sideBar'

const index = () => {
  return (
    <MetaDataLayout title='TalksUp - User Management'>
      <NavBar />
      <div style={{ display: 'flex', marginTop: '56px' }}>
        <UserResume />
      </div>
    </MetaDataLayout>
  )
}

export default index
