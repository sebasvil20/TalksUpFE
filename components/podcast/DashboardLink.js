import { Text } from '@nextui-org/react'

export const MenuLink = ({ text, isActive, onClickFunc }) => {
  const linkStyle = {
    color: isActive ? '#6334EB' : '#A0A3BD',
    cursor: 'pointer',
    '@sm': {
      marginRight: '40px',
    },
  }

  return (
    <Text onClick={onClickFunc} css={linkStyle}>
      {text}
    </Text>
  )
}
