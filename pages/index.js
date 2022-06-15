import { useEffect, useState } from 'react'

import { Loading } from '@nextui-org/react'
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'

import { MetaDataLayout } from '../components/layouts'
import { LoginContainer } from '../components/auth'
import { Loader } from '../components/loader'

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
        <Loader />
      ) : (
        <LoginContainer />
      )}
    </MetaDataLayout>
  )
}
