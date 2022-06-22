import { useContext, useState } from 'react'

import {
  Button,
  Input,
  Loading,
  Textarea,
  Text,
  Grid,
  Spacer,
  Modal,
} from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Typography from '@mui/material/Typography'

import { talksUpApi } from '../../api'
import { validations } from '../../utils'
import { FileUploader } from '../fileUploader/FileUploader'
import { AuthContext } from '../../context'

const steps = ['🥸', 'Icono', 'Cover', '💾']

export const CreateListModal = ({ visible, closeHandler, fetchData }) => {
  //Stepper
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())
  console.log(activeStep)

  const isStepOptional = (step) => {
    return false
  }

  const isStepSkipped = (step) => {
    return skipped.has(step)
  }

  const handleNext = () => {
    setIsLoading(true)
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    setActiveStep(activeStep + 1)
    setSkipped(newSkipped)
    setIsLoading(false)
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  //General
  const [isLoading, setIsLoading] = useState(false)
  const [iconURL, setIconURL] = useState()
  const [coverPicURL, setCoverPicURL] = useState()

  //Uploader
  const { uploadFile } = useContext(AuthContext)
  const [iconFiles, setIconFiles] = useState([])
  const [coverFiles, setCoverFiles] = useState([])

  const onUploadIcon = async () => {
    setIsLoading(true)
    if (iconFiles.length == 0) {
      setIsLoading(false)
      handleNext()
      return
    }
    let isValidUpload = await uploadFile(iconFiles[0])
    if (!isValidUpload) {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
      return
    }
    setIconURL(isValidUpload)
    setIsLoading(false)
    handleNext()
  }

  const onUploadCover = async () => {
    setIsLoading(true)
    if (coverFiles.length != 0) {
      let isValidUpload = await uploadFile(coverFiles[0])
      if (!isValidUpload) {
        setTimeout(() => {
          setIsLoading(false)
        }, 4000)
        return
      }
      setCoverPicURL(isValidUpload)
    }
    setIsLoading(false)
    handleNext()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSaveList = async ({ name, description }) => {
    setIsLoading(true)
    if (name.length < 3 || description.length < 3) {
      setIsLoading(false)
      setActiveStep(0)
    }
    try {
      var body = JSON.stringify({
        name: name,
        description: description,
        icon_url: iconURL,
        cover_pic_url: coverPicURL,
        user_id: Cookies.get('user_id'),
      })
      const { data } = await talksUpApi.post('/lists', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      setIsLoading(false)
      fetchData()
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false)
        setActiveStep(0)
      }, 1000)
    }
  }

  return (
    <Modal
      closeButton
      blur
      aria-labelledby='modal-title'
      open={visible}
      onClose={() => {
        closeHandler()
        setActiveStep(0)
        reset()
      }}
    >
      <Modal.Header>
        <Text h3>Crea una nueva lista</Text>
      </Modal.Header>
      <Modal.Body>
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
        <form onSubmit={handleSubmit(onSaveList)} noValidate>
          {activeStep === 0 ? (
            <>
              <Spacer />
              <Grid.Container gap={1.5} justify='center'>
                <Grid xs={12} justify='center'>
                  <Input
                    clearable
                    bordered
                    labelPlaceholder='Nombre de la lista'
                    {...register('name', {
                      required: 'Este campo es requerido',
                      validate: validations.isString,
                      minLength: {
                        value: 5,
                        message: 'Min. 5 caracteres',
                      },
                    })}
                    helperText='Min. 5 caracteres'
                    color={!!errors.name && 'error'}
                  />
                </Grid>

                <Grid xs={12} justify='center' css={{ marginBottom: '20px' }}>
                  <Textarea
                    minRows={6}
                    label='Descripción de la lista'
                    placeholder='Cuentanos de que se trata'
                    {...register('description', {
                      required: 'Este campo es requerido',
                      validate: validations.isString,
                      minLength: {
                        value: 15,
                        message: 'Min. 15 caracteres',
                      },
                    })}
                    helperText='Min. 15 caracteres'
                    color={!!errors.description && 'error'}
                  />
                </Grid>
              </Grid.Container>
              <Grid.Container justify='center'>
                <Button onPress={handleNext} type='button'>
                  Siguiente
                </Button>
              </Grid.Container>
            </>
          ) : activeStep === 1 ? (
            <>
              <FileUploader files={iconFiles} setFiles={setIconFiles} />
              <Grid.Container
                gap={1}
                justify='center'
                alignContent='center'
                alignItems='center'
              >
                <Grid xs={12} justify='center'>
                  <Button
                    type='button'
                    color='inherit'
                    onPress={() => setActiveStep(0)}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Button
                    disabled={isLoading}
                    onPress={() => onUploadIcon()}
                    type='button'
                  >
                    {isLoading ? (
                      <Loading type='points' color='currentColor' size='sm' />
                    ) : (
                      'Siguiente/Omitir'
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </>
          ) : activeStep === 2 ? (
            <>
              <FileUploader files={coverFiles} setFiles={setCoverFiles} />
              <Grid.Container
                gap={1}
                justify='center'
                alignContent='center'
                alignItems='center'
              >
                <Grid xs={12} justify='center'>
                  <Button
                    type='button'
                    color='inherit'
                    onPress={() => setActiveStep(1)}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Button
                    disabled={isLoading}
                    onPress={() => {
                      onUploadCover()
                    }}
                    type='button'
                  >
                    {isLoading ? (
                      <Loading type='points' color='currentColor' size='sm' />
                    ) : (
                      'Siguiente/Omitir'
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </>
          ) : (
            activeStep === 3 &&
            !isLoading && (
              <Grid.Container
                gap={1}
                justify='center'
                alignContent='center'
                alignItems='center'
              >
                <Grid xs={12} justify='center'>
                  <Button
                    color='inherit'
                    type='button'
                    onPress={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Button
                    type='submit'
                    disabled={isLoading}
                    color='secondary'
                    shadow
                    width='70%'
                    css={{
                      zIndex: 1,
                    }}
                  >
                    {isLoading ? (
                      <Loading type='points' color='currentColor' size='sm' />
                    ) : (
                      'Terminar'
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            )
          )}
        </form>
      </Modal.Body>
    </Modal>
  )
}
