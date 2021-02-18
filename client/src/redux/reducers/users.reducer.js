const initialState = {}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('setting user to state')
      return action.payload
    case 'LOGOUT_USER':
      console.log('setting user to logout')
      return action.payload
    default:
      return state
  }
}

export default reducer
