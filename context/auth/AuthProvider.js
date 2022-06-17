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
      const { user } = data.data
      Cookies.remove('hasLikes')
      Cookies.set('hasLikes', user.likes?.length > 0)
      dispatch({ type: '[Auth] - Login', payload: user })
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
      const { token, user } = data.data
      Cookies.set('token', token, {
        expires: 1,
      })
      Cookies.set('user_id', user.user_id, {
        expires: 1,
      })
      Cookies.set('lang', user.lang, {
        expires: 1,
      })
      Cookies.set('hasLikes', user.likes?.length > 0, {
        expires: 1,
      })
      dispatch({ type: '[Auth] - Login', payload: user })
      return true
    } catch (error) {
      return false
    }
  }

  const logoutUser = () => {
    Cookies.remove('token')
    Cookies.remove('user_id')
    Cookies.remove('lang')
    Cookies.remove('hasLikes')
    dispatch({ type: '[Auth] - Logout' })
    return true
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
      birth_date:
        user.BirthDate && user.BirthDate != '' ? user.BirthDate : null,
      profile_pic_url:
        user.ProfilePicURL && user.ProfilePicURL != ''
          ? user.ProfilePicURL
          : null,
      biography: user.Biography && user.Biography != '' ? user.Biography : null,
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

  const uploadFile = async (file) => {
    console.log(file)
    let formData = new FormData()
    formData.append('file', file.file)
    try {
      const { data } = await talksUpApi.put('/upload', formData)
      return data.data.url
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
      const { data } = await talksUpApi.post('/users/associate', body, {
        headers: { Authorization: `Bearer ${Cookies.get('token')}` },
      })
      Cookies.remove('hasLikes')
      Cookies.set('hasLikes', true)
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
        logoutUser,
        registerUser,
        updateUser,
        uploadFile,
        checkToken,
        associateLikesWithUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
