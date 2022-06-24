import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import {
  Grid,
  Text,
  Button,
  Spacer,
  Container,
  Input,
  Textarea,
  Loading,
} from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { MetaDataLayout } from '../../../../components/layouts'
import { Loader } from '../../../../components/loader'
import { NavBar } from '../../../../components/sideBar'

import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'
import { FileUploader } from '../../../../components/fileUploader/FileUploader'
import { AuthContext } from '../../../../context'
import { useForm } from 'react-hook-form'
import { validations } from '../../../../utils'
import { ErrorCard } from '../../../../components/errorCard'
import { talksUpApi } from '../../../../api'

const steps = ['Sube la imagen del artista', 'Datos del artista']

const NewArtistPage = () => {
  const { uploadFile } = useContext(AuthContext)
  const [files, setFiles] = useState([])
  const [artistImage, setArtistImage] = useState()
  const [uploaderError, setUploaderError] = useState(false)
  const [creationError, setCreationError] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (Cookies.get('role') != '1') {
      router.replace('/dashboard')
      return
    }

    setIsLoading(false)
  }, [router, router.isReady])

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepOptional = (step) => {
    return step === 0
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  // Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({ name, biography }) => {
    setIsLoading(true)
    try {
      var body = JSON.stringify({
        name: name,
        biography: biography,
        profile_pic_url: artistImage ? artistImage : null,
      })
      const { data } = await talksUpApi.post('/authors', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setIsLoading(false)
    } catch (error) {
      setCreationError(true)
      setTimeout(() => {
        setCreationError(false)
        setIsLoading(false)
      }, 4000)
      return
    }
    router.push('/dashboard/admin')
  }

  const onUploadImg = async () => {
    setIsLoading(true)
    const isValidUpload = await uploadFile(files[0])
    if (!isValidUpload) {
      setUploaderError(true)
      setTimeout(() => {
        setUploaderError(false)
        setIsLoading(false)
      }, 4000)
      return
    }

    setArtistImage(isValidUpload)
    setIsLoading(false)
    handleNext()
  }

  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp - Crear autores`}>
      <NavBar />
      {isLoading ? (
        <div
          style={{
            marginTop: '56px',
            padding: '20px',
            background: '#FBFCFF',
            minHeight: '100vh',
            width: '100%',
          }}
        >
          <Loader />
        </div>
      ) : (
        <div
          style={{
            marginTop: '56px',
            padding: '20px',
            background: '#FBFCFF',
          }}
        >
          {uploaderError && (
            <ErrorCard
              message='No se pudo subir la imagen'
              title='Error'
              show={uploaderError}
            />
          )}
          {creationError && (
            <ErrorCard
              message='No se pudo crear el artista'
              title='Error'
              show={creationError}
            />
          )}
          <Text
            css={{
              paddingLeft: '24px',
              marginTop: '2px',
              color: '#14142B',
            }}
            h1
          >
            Dashboard de administrador
          </Text>
          <Text
            css={{ paddingLeft: '26px', marginTop: '10px', color: '#6E7191' }}
          >
            Crear artistas
          </Text>
          <Spacer />
          <Container css={{ maxWidth: '50%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
                if (isStepOptional(index)) {
                  labelProps.optional = (
                    <Typography variant='caption'>Opcional</Typography>
                  )
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                )
              })}
            </Stepper>
            <Spacer />
            {activeStep === 0 ? (
              <>
                <FileUploader files={files} setFiles={setFiles} />
                <Spacer />
                <Grid.Container justify='space-between'>
                  <Grid>
                    <Button
                      color='error'
                      bordered
                      flat
                      onClick={() => router.back()}
                      css={{ marginRight: '10px' }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                  <Grid css={{ display: 'flex' }}>
                    {isStepOptional(activeStep) && (
                      <Button
                        color='primary'
                        bordered
                        flat
                        onClick={handleSkip}
                        css={{ marginRight: '10px' }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button
                      color='secondary'
                      disabled={files.length < 1 || isLoading}
                      onClick={onUploadImg}
                    >
                      {isLoading ? (
                        <Loading type='points' size='sm' />
                      ) : (
                        'Siguiente'
                      )}
                    </Button>
                  </Grid>
                </Grid.Container>
              </>
            ) : (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ width: '100%' }}
                >
                  <Grid.Container gap={2}>
                    <Grid xs={12} justify='center'>
                      <Text h1>Información del artista</Text>
                    </Grid>

                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        labelPlaceholder='Nombre del artista'
                        {...register('name', {
                          required: 'Este campo es requerido',
                          validate: validations.isString,
                          minLength: {
                            value: 5,
                            message: 'Min. 5 caracteres',
                          },
                        })}
                        helperText={errors.name?.message}
                        helperColor={!!errors.name && 'error'}
                        status={!!errors.name && 'error'}
                      />
                    </Grid>
                    <Spacer y={1.6} />
                    <Grid xs={12} justify='center'>
                      <Textarea
                        width='300px'
                        labelPlaceholder='Biografía del artista'
                        minRows={5}
                        {...register('biography', {
                          required: 'Este campo es requerido',
                          validate: validations.isString,
                          minLength: {
                            value: 5,
                            message: 'Min. 5 caracteres',
                          },
                        })}
                        helperText={
                          errors.biography?.message
                            ? errors.biography?.message
                            : 'Opcional'
                        }
                        helperColor={!!errors.biography && 'error'}
                        status={!!errors.biography && 'error'}
                      />
                    </Grid>
                  </Grid.Container>
                  <Spacer />
                  <Grid.Container justify='space-between'>
                    <Grid>
                      <Button
                        color='primary'
                        bordered
                        disabled={activeStep === 0}
                        onClick={handleBack}
                      >
                        Atras
                      </Button>
                    </Grid>
                    <Grid css={{ display: 'flex' }}>
                      <Button color='secondary' type='submit'>
                        Terminar
                      </Button>
                    </Grid>
                  </Grid.Container>
                </form>
              </>
            )}
          </Container>
        </div>
      )}
    </MetaDataLayout>
  )
}

export default NewArtistPage
