import { MetaDataLayout } from '../../../components/layouts'
import { UserResume } from '../../../components/user'
import { NavBar } from '../../../components/sideBar'
import { Container } from '@nextui-org/react'

const index = () => {
  return (
    <MetaDataLayout title='TalksUp - User Management'>
      <NavBar />
      <Container css={{ '@sm': {maxWidth: '80%'}, maxWidth: '100%', margin: '70px auto' }}>
        <UserResume />
      </Container>
    </MetaDataLayout>
  )
}

export default index
