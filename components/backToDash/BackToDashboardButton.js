import { Button } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

export const BackToDashboardButton = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push('/dashboard')}
      css={{
        margin: 'auto',
        background: 'transparent',
        color: '#6E7191',
      }}
    >
      ← Volver al dashboard
    </Button>
  )
}
