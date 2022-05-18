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

  const checkToken = async() => {

    if(!Cookies.get('token')) {
      return;
    }

    try {
      const { data } = await talksUpApi.get('/auth/validate', {headers: {'Authorization': `Bearer ${Cookies.get('token')}`}})
      console.log(data)
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        loginUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
