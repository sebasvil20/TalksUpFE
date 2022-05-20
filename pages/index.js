import { useEffect, useState } from 'react'

import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { MetaDataLayout } from '../components/layouts'
import { LoginContainer } from '../components/auth'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    if (Cookies.get('token')) {
      router.push('/dashboard')
      return
    }
    setIsLoading(false)
  }, [router])

  return (
    <MetaDataLayout title='TalksUp - Login'>
      {isLoading ? (
        <Loading
          size='lg'
          color='secondary'
          css={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%,0)',
          }}
        />
      ) : (
        <LoginContainer />
      )}
    </MetaDataLayout>
  )
}
