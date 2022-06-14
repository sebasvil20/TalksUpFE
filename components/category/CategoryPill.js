import React from 'react'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import {
  Card,
  Col,
  Row,
  Button,
  Text,
  Link,
  Grid,
  Image,
} from '@nextui-org/react'

export const CategoryPill = ({ name, id }) => {
  return (
    <Link
      href={`/dashboard/categories/${id}`}
      css={{
        color: '#6334EB',
        padding: '5px',
        marginRight: '5px',
        marginTop: '5px',
        borderRadius: '15px',
        textTransform: 'lowercase',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <LocalOfferIcon /> {name}
    </Link>
  )
}
