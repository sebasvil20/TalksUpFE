import { useRouter } from 'next/router'
import { useContext, useEffect, useMemo, useState } from 'react'

import {
  Grid,
  Text,
  Button,
  Spacer,
  Container,
  Input,
  Textarea,
  Loading,
  Dropdown,
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

import { FileUploader } from '../../../../components/fileUploader/FileUploader'
import { AuthContext } from '../../../../context'
import { validations } from '../../../../utils'
import { ErrorCard } from '../../../../components/errorCard'
import { talksUpApi } from '../../../../api'
import { MetaDataLayout } from '../../../../components/layouts'
import { Loader } from '../../../../components/loader'
import { NavBar } from '../../../../components/sideBar'

const steps = ['Sube la imagen del podcast', 'Datos del podcast']

const NewPodcastPage = () => {
  const [selected, setSelected] = useState(
    new Set(['eb4b1438-da09-4b37-be59-4d921aeba947'])
  )
  console.log(Array.from(selected)[0])

  const selectedValue = useMemo(
    () =>
      Array.from(selected)[0] === '3eca4a4b-50fd-48e1-a683-fb1ed323eb1e'
        ? 'YouTube'
        : Array.from(selected)[0] === '6e1355a6-a6d0-4206-90d9-1ca2b4498318'
        ? 'iTunes'
        : 'Spotify',
    [selected]
  )

  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])

  const { uploadFile } = useContext(AuthContext)
  const [files, setFiles] = useState([])
  const [podcastImage, setPodcastImage] = useState()
  const [uploaderError, setUploaderError] = useState(false)
  const [creationError, setCreationError] = useState(false)

  const [artistID, setArtistID] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (Cookies.get('role') != '1' || !router.query.artist_id) {
      router.replace('/dashboard')
      return
    }

    setArtistID(router.query.artist_id)

    const fetchCategories = async () => {
      const { data } = await talksUpApi.get('/categories')
      const fetchedCategories = data.data.map((category) => ({
        id: category.category_id,
        label: category.name,
      }))
      setCategories(fetchedCategories)
    }
    fetchCategories()

    setIsLoading(false)
  }, [router, router.isReady])

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

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

  // Form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async ({
    name,
    description,
    total_episodes,
    total_length,
    release_date,
    last_updated,
    redirect_url,
  }) => {
    setIsLoading(true)
    try {
      var body = JSON.stringify({
        name: name,
        description: description,
        cover_pic_url: podcastImage,
        total_episodes: Number.parseInt(total_episodes),
        total_length: total_length,
        release_date: release_date,
        update_date: last_updated,
        lang_id: 'ESP',
        author_id: artistID,
        platforms: [
          {
            platform_id: Array.from(selected)[0],
            redirect_url: redirect_url,
          },
        ],
        categories: [...new Set(selectedCategories)],
      })
      const { data } = await talksUpApi.post('/podcasts', body, {
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

    setPodcastImage(isValidUpload)
    setIsLoading(false)
    handleNext()
  }

  return (
    <MetaDataLayout title={isLoading ? 'TalksUp' : `TalksUp - Crear podcasts`}>
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
              message='No se pudo crear el podcast'
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
            Crear podcast
          </Text>
          <Spacer />
          <Container css={{ maxWidth: '50%' }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {}
                const labelProps = {}
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
                      <Text h1>Información del podcast</Text>
                    </Grid>

                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        labelPlaceholder='Nombre del podcast'
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
                        labelPlaceholder='Descripción'
                        minRows={5}
                        {...register('description', {
                          required: 'Este campo es requerido',
                          validate: validations.isString,
                          minLength: {
                            value: 5,
                            message: 'Min. 5 caracteres',
                          },
                        })}
                        helperText={errors.description?.message}
                        helperColor={!!errors.description && 'error'}
                        status={!!errors.description && 'error'}
                      />
                    </Grid>
                    <Spacer y={1.6} />
                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        type='number'
                        labelPlaceholder='Total de episodios'
                        {...register('total_episodes', {
                          required: 'Este campo es requerido',
                        })}
                        helperText={errors.total_episodes?.message}
                        helperColor={!!errors.total_episodes && 'error'}
                        status={!!errors.total_episodes && 'error'}
                      />
                    </Grid>
                    <Spacer y={1.6} />
                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        labelPlaceholder='Longitud total'
                        {...register('total_length', {
                          required: 'Este campo es requerido',
                        })}
                        helperText={errors.total_length?.message}
                        helperColor={!!errors.total_length && 'error'}
                        status={!!errors.total_length && 'error'}
                      />
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        type='date'
                        label='Ultima actualización'
                        {...register('last_updated', {
                          required: 'Este campo es requerido',
                        })}
                        helperText={errors.last_updated?.message}
                        helperColor={!!errors.last_updated && 'error'}
                        status={!!errors.last_updated && 'error'}
                      />
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        type='date'
                        label='Fecha lanzamiento'
                        {...register('release_date', {
                          required: 'Este campo es requerido',
                        })}
                        helperText={errors.release_date?.message}
                        helperColor={!!errors.release_date && 'error'}
                        status={!!errors.release_date && 'error'}
                      />
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Container css={{ width: '500px' }}>
                        <Autocomplete
                          multiple
                          fullWidth
                          id='tags-outlined'
                          options={categories}
                          onChange={(e, v) => {
                            v.forEach((value) => {
                              setSelectedCategories([
                                ...selectedCategories,
                                value.id,
                              ])
                            })
                          }}
                          getOptionLabel={(option) => option.label}
                          filterSelectedOptions
                          disableCloseOnSelect
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label='Selecciona 1 o mas categorías'
                              placeholder='Favorites'
                            />
                          )}
                        />
                      </Container>
                    </Grid>
                    <Grid xs={12} justify='center'>
                      <Dropdown>
                        <Dropdown.Button
                          flat
                          color='secondary'
                          css={{ tt: 'capitalize' }}
                        >
                          {selectedValue}
                        </Dropdown.Button>
                        <Dropdown.Menu
                          aria-label='Single selection actions'
                          color='secondary'
                          disallowEmptySelection
                          selectionMode='single'
                          selectedKeys={selected}
                          onSelectionChange={setSelected}
                        >
                          <Dropdown.Item key='eb4b1438-da09-4b37-be59-4d921aeba947'>
                            Spotify
                          </Dropdown.Item>
                          <Dropdown.Item key='6e1355a6-a6d0-4206-90d9-1ca2b4498318'>
                            iTunes
                          </Dropdown.Item>
                          <Dropdown.Item key='3eca4a4b-50fd-48e1-a683-fb1ed323eb1e'>
                            YouTube
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Grid>
                    <Spacer y={0.5} />
                    <Grid xs={12} justify='center'>
                      <Input
                        width='300px'
                        clearable
                        labelPlaceholder='URL del podcast (En la plataforma)'
                        {...register('redirect_url', {
                          required: 'Este campo es requerido',
                        })}
                        helperText={errors.redirect_url?.message}
                        helperColor={!!errors.redirect_url && 'error'}
                        status={!!errors.redirect_url && 'error'}
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
          <Spacer y={3} />
        </div>
      )}
    </MetaDataLayout>
  )
}

export default NewPodcastPage
