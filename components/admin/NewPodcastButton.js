import { useRouter } from 'next/router'

import FiberNewIcon from '@mui/icons-material/FiberNew'

import { IconButton } from './'

export const NewPodcastButton = ({ artist_id }) => {
  const router = useRouter()
  return (
    <IconButton
      onClick={() =>
        router.push(`/dashboard/admin/newpodcast?artist_id=${artist_id}`)
      }
    >
      <FiberNewIcon style={{ color: '#4E74FF' }} />
    </IconButton>
  )
}
