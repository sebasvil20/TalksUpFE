import { useTheme, Spacer, Input, Button, Grid } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { talksUpApi } from '../../api'

export const RegisterForm = () => {
  const { theme } = useTheme()
  const [validData, setValidData] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  const onRegisterUser = async ({ email, password }) => {
    setValidData(false)
    try {
      const { data } = await talksUpApi.post('/users/login', {
        email,
        password,
      })
      const { token } = data.data
    } catch (error) {
      setValidData(true)
      setTimeout(() => {
        setValidData(false)
      }, 3000)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onRegisterUser)}
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        noValidate
      >
        <Grid.Container gap={2} justify='center'>
          <Grid xs={6}>
            <Input
              placeholder='Type your email'
              label='Email'
              width='100%'
              type='email'
            />
          </Grid>
          <Grid xs={6}>
            <Input
              placeholder='Nickname or username'
              width='100%'
              label='Public name'
            />
          </Grid>
          <Grid xs={6}>
            <Input.Password
              placeholder='Type your password'
              label='Password'
              width='100%'
            />
          </Grid>
          <Grid xs={6}>
            <Input.Password
              placeholder='Type your password'
              label='Password confirmation'
              width='100%'
            />
          </Grid>
        </Grid.Container>
        <Spacer y={2} />
        <Button type='submit' color='secondary' shadow width='70%'>
          LogIn
        </Button>
      </form>
    </>
  )
}
