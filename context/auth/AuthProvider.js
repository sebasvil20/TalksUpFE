import { useReducer, useEffect } from 'react'
import { AuthContext, authReducer } from './'

import { talksUpApi } from '../../api'

import Cookies from 'js-cookie'

const AUTH_INITIAL_STATE = {
  isLoggedIn: false,
  user: undefined,
}

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  useEffect(() => {
    checkToken()
  }, [])

  const checkToken = async () => {
    const token = Cookies.get('token')
    if (!token) {
      return
    }

    try {
      const { data } = await talksUpApi.get('/auth/validate', {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch({ type: '[Auth] - Login', payload: token })
    } catch (error) {
      Cookies.remove('token')
    }
  }

  const loginUser = async (email, password) => {
    try {
      const { data } = await talksUpApi.post('/auth/login', {
        email,
        password,
      })
      const { token } = data.data
      Cookies.set('token', token)
      dispatch({ type: '[Auth] - Login', payload: token })
      return true
    } catch (error) {
      return false
    }
  }

  const registerUser = async (user) => {
    var body = JSON.stringify({
      public_name: user.PublicName,
      email: user.Email,
      password: user.Password,
      lang_id: user.Language,
      country_id: user.Country,
    })
    try {
      const { data } = await talksUpApi.post('/users', body)
      const { user_id, public_name } = data.data
      dispatch({
        type: '[Auth] - Register',
        payload: { userId: user_id, publicName: public_name },
      })
      return true
    } catch (error) {
      return false
    }
  }

  const updateUser = async (user) => {
    var body = JSON.stringify({
      user_id: user.UserID,
      first_name: user.FirstName,
      last_name: user.LastName,
      birth_date: user.BirthDate,
      phone_number:
        user.PhoneNumber && user.PhoneNumber != '' ? user.PhoneNumber : null,
    })
    try {
      const { data } = await talksUpApi.put('/users', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      dispatch({ type: '[Auth] - Update user', payload: data.data })
      return true
    } catch (error) {
      return false
    }
  }

  const associateLikesWithUser = async (user) => {
    var body = JSON.stringify({
      user_id: user.UserID,
      categories: user.Categories,
    })
    try {
      const { data } = await talksUpApi.put('/users/associate', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      dispatch({
        type: '[Auth] - Associate user with likes',
        payload: data.data,
      })
      return true
    } catch (error) {
      return false
    }
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
        registerUser,
        updateUser,
        associateLikesWithUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}