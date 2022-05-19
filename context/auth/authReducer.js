export const authReducer = (state, action) => {
  switch (action.type) {
    case '[Auth] - Login':
      return {
        ...state,
        isLoggedIn: true,
      }
    case '[Auth] - Register':
      return {
        ...state,
        userId: action.payload.userId,
        userName: action.payload.publicName,
      }
    case '[Auth] - Update user':
      return {
        ...state,
        user: action.payload,
      }
    case '[Auth] - Logout':
      return {
        ...state,
        isLoggedIn: false,
        user: undefined,
      }
    case '[Auth] - Associate user with likes':
      return {
        ...state,
      }
    default:
      return state
  }
}
