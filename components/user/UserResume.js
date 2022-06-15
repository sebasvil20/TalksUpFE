import { useContext, useEffect, useState } from 'react'

import { Text, Grid, Container, Button, Avatar } from '@nextui-org/react'
import { AnimatePresence } from 'framer-motion'
import Chip from '@mui/material/Chip'
import Cookies from 'js-cookie'

import EditIcon from '@mui/icons-material/Edit'
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown'

import { AuthContext } from '../../context'
import { FileUploader } from '../fileUploader/FileUploader'
import { ErrorCard } from '../errorCard'
import { Loader } from '../loader'
import { EditUserModal, EditLikesModal } from './'

export const UserResume = () => {
  const { user, uploadFile, updateUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(true)
  const [showUploadError, setShowUploadError] = useState(false)
  const [showIconEditImage, setShowIconEditImage] = useState(false)
  const [editImage, setEditImage] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [visibleEditLikesModal, setVisibleEditLikesModal] = useState(false)
  const [files, setFiles] = useState([])

  const onUploadImg = async () => {
    setIsLoading(true)
    const isValidUpload = await uploadFile(files[0])
    if (!isValidUpload) {
      setShowUploadError(true)
      setTimeout(() => {
        setShowUploadError(false)
        setIsLoading(false)
      }, 4000)
      return
    }

    const isValidUpdate = await updateUser({
      UserID: Cookies.get('user_id'),
      ProfilePicURL: isValidUpload,
    })
    if (!isValidUpdate) {
      setShowUploadError(true)
      setTimeout(() => {
        setShowUploadError(false)
        setIsLoading(false)
      }, 4000)
      return
    }

    setEditImage(false)
    setIsLoading(false)
    setShowIconEditImage(false)
  }

  useEffect(() => {
    if (user) {
      setIsLoading(false)
    }
  }, [user])

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid.Container gap={2} alignContent='center' justify='center'>
            <Grid
              xs={12}
              css={{ position: 'relative' }}
              onMouseOver={() => setShowIconEditImage(true)}
              onMouseOut={() => setShowIconEditImage(false)}
              justify='center'
              alignItems='center'
            >
              <AnimatePresence>
                {showUploadError && (
                  <ErrorCard
                    title='Error actualizando info'
                    message='Intentelo mas tarde'
                  />
                )}
              </AnimatePresence>
              {editImage ? (
                <Container justify='center'>
                  <FileUploader files={files} setFiles={setFiles} />
                  <Grid.Container css={{ marginTop: '30px' }}>
                    <Grid
                      sm={12}
                      xs={6}
                      css={{ padding: '5px' }}
                      justify='center'
                    >
                      <Button
                        css={{ maxWitdh: '100px' }}
                        onClick={() => {
                          setEditImage(false)
                          setShowIconEditImage(false)
                        }}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid
                      sm={12}
                      xs={6}
                      css={{ padding: '5px' }}
                      justify='center'
                    >
                      <Button onClick={() => onUploadImg()}>Guardar</Button>
                    </Grid>
                  </Grid.Container>
                </Container>
              ) : (
                <div className='fpfImg'>
                  {showIconEditImage && (
                    <Avatar
                      css={{
                        zIndex: '90',
                        position: 'absolute',
                        top: '12px',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        size: '200px',
                        padding: 0,
                        margin: 0,
                        cursor: 'pointer',
                      }}
                      text='✏️'
                      onClick={() => setEditImage(true)}
                    />
                  )}
                  <Avatar
                    css={{ size: '200px', zIndex: '1', margin: 0, padding: 0 }}
                    alt='user pfp img'
                    onError={(e) =>
                      (e.target.src =
                        'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png')
                    }
                    src={
                      user?.profile_pic_url
                        ? user.profile_pic_url
                        : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
                    }
                  />
                </div>
              )}
            </Grid>
            <Grid xs={12} direction='column' justify='center'>
              <Text
                color='#4E4B66'
                css={{
                  '@smMax': { padding: '0' },
                  paddingLeft: '4px',
                  textAlign: 'center',
                }}
                h6
              >
                Hi! 🤩 {user?.public_name}
              </Text>
              <Text
                color='#14142B'
                css={{
                  textAlign: 'center',
                  '@smMax': { textAlign: 'center', padding: '0' },
                }}
                h1
              >
                {user?.first_name} {user?.last_name}
              </Text>

              {user?.biography && (
                <Text
                  color='#4E4B66'
                  css={{
                    textAlign: 'center',
                    '@smMax': { textAlign: 'center', padding: '0' },
                  }}
                >
                  {user?.biography} 😁
                </Text>
              )}
              {user?.likes && (
                <Container
                  css={{
                    padding: 0,
                    marginTop: '20px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'flex-start',
                    justifyContent: 'center',
                  }}
                >
                  {user.likes.map((like) => (
                    <Chip
                      style={{ margin: '0 10px' }}
                      key={like.category_id}
                      label={like.name}
                      color='primary'
                      variant='outlined'
                    />
                  ))}
                </Container>
              )}
              <Container
                css={{
                  width: 'max-content',
                  flexWrap: 'nowrap',
                  '@smMax': { width: '100%' },
                  margin: '20px auto',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '0',
                }}
              >
                <Button
                  auto
                  color='primary'
                  shadow
                  css={{
                    margin: '20px 2px',
                    '@sm': {
                      width: '100px!important',
                    },
                  }}
                  onClick={() => setVisibleModal(true)}
                  iconRight={<EditIcon />}
                >
                  Editar perfil
                </Button>
                <Button
                  auto
                  color='secondary'
                  shadow
                  css={{
                    margin: '20px 2px',
                    '@sm': { width: '100px!important' },
                  }}
                  onClick={() => setVisibleEditLikesModal(true)}
                  iconRight={<ThumbsUpDownIcon />}
                >
                  Editar gustos
                </Button>
              </Container>
              <EditUserModal
                visible={visibleModal}
                closeHandler={() => setVisibleModal(false)}
              />
              <EditLikesModal
                visible={visibleEditLikesModal}
                closeHandler={() => setVisibleEditLikesModal(false)}
              />
            </Grid>
          </Grid.Container>
        </>
      )}
    </>
  )
}
