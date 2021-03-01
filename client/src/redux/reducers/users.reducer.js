const initialState = { darkMode: false }

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      // console.log('setting user to state')
      return action.payload
    case 'LOGOUT_USER':
      // console.log('setting user to logout')
      return initialState
    default:
      return state
  }
}

export default reducer
