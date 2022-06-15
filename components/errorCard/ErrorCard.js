import { Text, Card } from '@nextui-org/react'
import { motion } from 'framer-motion'

export const ErrorCard = ({ title, message }) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        zIndex: '10',
      }}
      transition={{ duration: 0.5 }}
      initial={{
        opacity: 0,
        left: -100,
        top: 'calc(100% - 90px)',
        position: 'fixed',
      }}
      animate={{
        x: 120,
        opacity: 1,
        top: 'calc(100% - 90px)',
      }}
      exit={{ x: -100, opacity: 0 }}
    >
      <Card
        css={{
          color: 'white',
          maxWidth: 'fit-content',
          margin: 'auto',
          backgroundColor: '$error',
          p: '10px 15px',
        }}
      >
        <Text
          css={{ display: 'block', width: 'max-content', fontWeight: '800' }}
        >
          {title}
        </Text>
        <Text css={{ display: 'block', width: 'max-content' }}>{message}</Text>
      </Card>
    </motion.div>
  )
}
