const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_POSTS':
      console.log('GET POSTS REDUCER DEPLOYED')
      return action.payload
    default:
      console.log('DEFAULT REDUCER DEPLOYED')
      return state
  }
}

export default reducer
