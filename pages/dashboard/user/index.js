import { MetaDataLayout } from '../../../components/layouts'
import { UserResume } from '../../../components/user'
import { NavBar } from '../../../components/sideBar'
import { Container } from '@nextui-org/react'

const UserManagementPage = () => {
  return (
    <MetaDataLayout title='TalksUp - User Management'>
      <NavBar />
      <Container
        css={{
          '@md': { maxWidth: '40%' },
          maxWidth: '100%',
          display: 'flex',
          margin: '70px auto',
        }}
      >
        <UserResume />
      </Container>
    </MetaDataLayout>
  )
}

export default UserManagementPage
