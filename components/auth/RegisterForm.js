import { useState } from 'react'

import { Container } from '@nextui-org/react'

import { RegisterFirstForm } from './RegisterFirstForm'
import { RegisterSecondForm } from './RegisterSecondForm'

import { AnimatePresence } from 'framer-motion'
import { RegisterThirdForm } from './RegisterThirdForm'

export const RegisterForm = () => {
  const [stepper, setStepper] = useState(3)

  return (
    <Container
      css={{ minHeight: '400px', overflow: 'hidden', position: 'relative' }}
    >
      <AnimatePresence>
        {stepper == 1 && <RegisterFirstForm setStepper={setStepper} />}
      </AnimatePresence>
      <AnimatePresence>
        {stepper == 2 && <RegisterSecondForm setStepper={setStepper} />}
      </AnimatePresence>
      <AnimatePresence>
        {stepper == 3 && <RegisterThirdForm setStepper={setStepper} />}
      </AnimatePresence>
    </Container>
  )
}
