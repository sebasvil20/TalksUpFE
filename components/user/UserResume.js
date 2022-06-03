import { useContext, useState } from 'react'
import Chip from '@mui/material/Chip'

import { Image, Text, Grid, Container, Button } from '@nextui-org/react'
import { motion, AnimatePresence } from 'framer-motion'
import { ErrorCard } from '../errorCard'

import Cookies from 'js-cookie'

import { AuthContext } from '../../context'
import { FileUploader } from '../fileUploader/FileUploader'
import { Loader } from '../loader'

export const UserResume = () => {
  const { user, uploadFile, updateUser } = useContext(AuthContext)
  const [isLoading, setIsLoading] = useState(false)
  const [showUploadError, setShowUploadError] = useState(false)
  const [showIconEditImage, setShowIconEditImage] = useState(false)
  const [editImage, setEditImage] = useState(false)
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
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid.Container gap={2} alignContent='center'>
            <Grid
              sm={2}
              xs={12}
              css={{ position: 'relative' }}
              onMouseOver={() => setShowIconEditImage(true)}
              onMouseOut={() => setShowIconEditImage(false)}
            >
              <AnimatePresence>
                {showUploadError && (
                  <ErrorCard
                    title='Error subiendo imagen'
                    message='Intentelo mas tarde'
                  />
                )}
              </AnimatePresence>
              {editImage ? (
                <Container justify='center'>
                  <FileUploader files={files} setFiles={setFiles} />
                  <Grid.Container css={{marginTop: '30px'}}>
                    <Grid sm={12} xs={6} css={{padding: '5px'}} justify='center'>
                      <Button
                        css={{ maxWitdh: '100px' }}
                        onClick={() => setEditImage(false)}
                      >
                        Cancelar
                      </Button>
                    </Grid>
                    <Grid sm={12} xs={6} css={{padding: '5px'}} justify='center'>
                      <Button onClick={() => onUploadImg()}>Guardar</Button>
                    </Grid>
                  </Grid.Container>
                </Container>
              ) : (
                <>
                  {showIconEditImage && (
                    <div
                      style={{
                        zIndex: '10',
                        position: 'absolute',
                        top: '10%',
                        left: '50%',
                        transform: 'translate(-50%, 0)',
                        width: '80%',
                        height: '80%',
                        borderRadius: '15px',
                        background: 'rgb(78, 75, 102, 90%)',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onClick={() => setEditImage(true)}
                    >
                      <Text color='white'>Haga click aca para editar</Text>
                    </div>
                  )}
                  <Image
                    alt='user pfp img'
                    src={
                      user?.profile_pic_url
                        ? user.profile_pic_url
                        : 'https://talksupcdn.sfo3.cdn.digitaloceanspaces.com/88be4dd4-dc7b-11ec-b799-acde48001122.png'
                    }
                  />
                </>
              )}
            </Grid>
            <Grid sm={10} xs={12} direction='column' justify='center'>
              <Text
                color='#4E4B66'
                css={{
                  '@smMax': { textAlign: 'center', padding: '0' },
                  paddingLeft: '4px',
                }}
                h6
              >
                Hi! 🤩 {user?.public_name}
              </Text>
              <Text
                color='#14142B'
                css={{ '@smMax': { textAlign: 'center', padding: '0' } }}
                h1
              >
                {user?.first_name} {user?.last_name}
              </Text>

              {user?.biography && (
                <Text
                  color='#4E4B66'
                  css={{ '@smMax': { textAlign: 'center', padding: '0' } }}
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
                    '@smMax': { justifyContent: 'center' },
                  }}
                >
                  {user.likes.map((like) => (
                    <Chip
                      style={{ marginRight: '10px' }}
                      key={like.category_id}
                      label={like.name}
                      color='primary'
                      variant='outlined'
                    />
                  ))}
                </Container>
              )}
            </Grid>
          </Grid.Container>
        </>
      )}
    </>
  )
}
