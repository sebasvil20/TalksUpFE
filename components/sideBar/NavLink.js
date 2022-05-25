import React from 'react'
import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTheme } from '@nextui-org/react'

export const NavLink = ({ children, href }) => {
  const [isServer, setIsServer] = useState(true)
  const { type, theme } = useTheme()
  const child = React.Children.only(children)
  const router = useRouter()
  return (
    <div
      style={{
        height: '60px',
        fontSize: '18px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'regular',
        borderRadius: '15px',
        background: `${
          router.pathname === href
            ? theme.colors.contrastBackground
              ? theme.colors?.contrastBackground?.value
              : type == 'light' && '#14142B'
            : ''
        }`,
        color: `${
          router.pathname === href
            ? theme.colors.contrastTitle
              ? theme.colors?.contrastTitle?.value
              : type == 'light' && '#fff'
            : theme.colors?.titles?.value
        }`,
      }}
    >
      <Link href={href}>
        {React.cloneElement(child, {
          'aria-current': router.pathname === href ? 'page' : null,
        })}
      </Link>
    </div>
  )
}
