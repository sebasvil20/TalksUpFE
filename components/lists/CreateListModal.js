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

  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepOptional = (step) => {
    return step === 1 || step === 2
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
      throw new Error('No te puedes saltar este paso')
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

  const onSaveList = async ({ name, description }) => {
    setIsLoading(true)

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
    } catch (error) {
      setTimeout(() => {
        setIsLoading(false)
      }, 4000)
    }

    setIsLoading(false)
    fetchData()
    closeHandler()
  }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

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
                    helperText={errors.name?.message}
                    color={!!errors.name && 'error'}
                  />
                </Grid>

                <Grid xs={12} justify='center'>
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
                    helperText={errors.description?.message}
                    color={!!errors.description && 'error'}
                  />
                </Grid>
              </Grid.Container>
              <Grid.Container justify='center'>
                <Button onClick={handleNext} type='button'>
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
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Button
                    onClick={() => {
                      onUploadIcon()
                    }}
                    type='button'
                  >
                    {isLoading ? (
                      <Loading type='points' color='currentColor' size='sm' />
                    ) : activeStep === steps.length - 1 ? (
                      'Terminar'
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
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Atras
                  </Button>
                </Grid>
                <Grid xs={12} justify='center'>
                  <Button
                    onClick={() => {
                      onUploadCover()
                    }}
                    type='button'
                  >
                    {isLoading ? (
                      <Loading type='points' color='currentColor' size='sm' />
                    ) : activeStep === steps.length - 1 ? (
                      'Terminar'
                    ) : (
                      'Siguiente/Omitir'
                    )}
                  </Button>
                </Grid>
              </Grid.Container>
            </>
          ) : (
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
                  disabled={activeStep === 0}
                  onClick={handleBack}
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
          )}
        </form>
      </Modal.Body>
    </Modal>
  )
}
