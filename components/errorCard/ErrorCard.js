import { Text, Card } from '@nextui-org/react'

export const ErrorCard = ({ title, message, show }) => {
  return (
    <Card
      color='error'
      css={{
        color: 'white',
        maxWidth: 'fit-content',
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        zIndex: '10',
      }}
    >
      <Text css={{ fontWeight: '800' }}>{title}</Text>
      <Text>{message}</Text>
    </Card>
  )
}
