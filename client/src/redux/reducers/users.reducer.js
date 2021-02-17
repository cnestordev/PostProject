const initialState = {
  user: null,
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      console.log('setting user to state')
      return action.payload
    case 'LOGOUT_USER':
      return state
    default:
      return state
  }
}

export default reducer
