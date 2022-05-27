import { MetaDataLayout } from '../../../components/layouts'
import { UserResume } from '../../../components/user'

const index = () => {
  return (
    <MetaDataLayout title='TalksUp - User Management'>
      <div style={{ display: 'flex' }}>
        <UserResume />
      </div>
    </MetaDataLayout>
  )
}

export default index
