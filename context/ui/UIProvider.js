import { useReducer } from 'react'

import { UIReducer, UIContext } from './'
const UI_INITIAL_STATE = {
  isOpenMenu: false,
}

export const UIProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE)

  const toggleSideMenu = () => {
    dispatch({ type: '[UI] - ToggleMenu' })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        toggleSideMenu,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
