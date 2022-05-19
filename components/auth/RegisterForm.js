import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import { Container, Loading } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'

import { RegisterFirstForm } from './RegisterFirstForm'
import { RegisterSecondForm } from './RegisterSecondForm'
import { RegisterThirdForm } from './RegisterThirdForm'

export const RegisterForm = ({ categories }) => {
  const router = useRouter()
  const [stepper, setStepper] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (stepper == 4) {
      setIsLoading(true)
      router.replace('/dashboard')
      return
    }
  }, [stepper])

  return (
    <>
      <Container
        css={{ minHeight: '400px', overflow: 'hidden', position: 'relative' }}
      >
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
          <>
            <AnimatePresence>
              {stepper == 1 && <RegisterFirstForm setStepper={setStepper} />}
            </AnimatePresence>
            <AnimatePresence>
              {stepper == 2 && <RegisterSecondForm setStepper={setStepper} />}
            </AnimatePresence>
            <AnimatePresence>
              {stepper == 3 && (
                <RegisterThirdForm
                  setStepper={setStepper}
                  categories={categories}
                />
              )}
            </AnimatePresence>
          </>
        )}
      </Container>
    </>
  )
}
