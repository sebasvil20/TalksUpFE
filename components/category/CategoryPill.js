import { Link } from '@nextui-org/react'

import LocalOfferIcon from '@mui/icons-material/LocalOffer'

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
        fontSize: '14px',
      }}
    >
      <LocalOfferIcon fontSize='16px' /> {name}
    </Link>
  )
}
